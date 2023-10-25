import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @description Used to get name and height character data
 * @param {Request}     req Incoming request
 * @param {Response}    res Outgoing response
 * @returns {Response}      A 200 with name and height character data
 */
export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await prisma.character.findMany({
      select: {
        name: true,
        height: true,
        series: { include: { series: { include: { company: true } } } }, // Very tricky because of relation table and joins
      },
    });

    /** 
     * Will return a list of objects that look like this:
     * 
     *  {
          "name": "Black Widow",
          "height": 164,
          "series": [
            {
              "seriesName": "Avengers",
              "seriesFirstIssue": "1991-02-04T00:00:00.000Z",
              "characterKey": 178,
              "series": {
                "name": "Avengers",
                "firstIssue": "1991-02-04T00:00:00.000Z",
                "companyName": "Marvel",
                "company": {
                  "name": "Marvel"
                }
              }
            }
          ]
        }

     * But we should clean this up before returning the data  
     */

    const refinedCharacters = characters.map((character) => ({
      name: character.name,
      height: character.height,
      series: character.series.map((series) => ({
        name: series.seriesName,
        firstIssue: series.seriesFirstIssue,
        company: series.series.company,
      })),
    }));
    res.status(200).json(refinedCharacters);
  } catch (e: any) {
    console.error(e);
    res.status(404).send('No characters found.');
  }
};

export const getCharacter = async (req: Request, res: Response) => {
  const { name } = req.query;
  if (!name) return res.status(400).send('No character name given.');
  try {
    const character = await prisma.character.findFirst({
      where: {
        name: name as string,
      },
      include: {
        // Need this to add data connected by foreign keys (works like a join)
        city: true,
        series: true,
      },
    });
    res.status(200).json(character);
  } catch {
    res.status(404).send('Character not found.');
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  const { name } = req.query;
  const { cityId, height } = req.body;
  if (!name) return res.status(400).send('No character name given.');
  try {
    const character = await prisma.character.update({
      where: { name: name as string },
      // only updates height and cityId, and only updates a column if defined!
      data: {
        height,
        cityId,
      },
    });
    res.status(200).json(character);
  } catch {
    res.status(404).send('Character not found.');
  }
};

// export const addCharacter = async (req: Request, res: Response) => {
//   const {name, } = req.body;
// }
