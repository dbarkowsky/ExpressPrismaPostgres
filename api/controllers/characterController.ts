import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

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
    return res.status(200).json(refinedCharacters);
  } catch (e: any) {
    console.error(e);
    return res.status(404).send('No characters found.');
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
    return res.status(200).json(character);
  } catch (e: any) {
    console.error(e);
    return res.status(404).send('Character not found.');
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
    return res.status(200).json(character);
  } catch (e: any) {
    console.error(e);
    return res.status(404).send('Character not found.');
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  const { name } = req.query;
  if (!name) return res.status(400).send('No character name given.');
  try {
    // Delete relations
    await prisma.seriesCharacter.deleteMany({
      where: { character: { name: name as string } },
    });
    // Delete character
    await prisma.character.delete({
      where: { name: name as string },
    });
    return res.status(204).send();
  } catch (e: any) {
    console.error(e);
    return res.status(404).send('Character not found.');
  }
};

export const addCharacter = async (req: Request, res: Response) => {
  const { name, height, series, cityId } = req.body;
  if (!name || !height) {
    return res.status(400).send('name or height are missing from body, but they are required');
  }

  // Add city if specified
  if (cityId !== undefined) {
    // Find a matching city
    try {
      await prisma.city.findUnique({ where: { id: cityId } });
    } catch {
      console.warn('City not found database');
      return res.status(404).send('City ID not found.');
    }
  }

  interface ISeriesIncoming {
    seriesName: string;
    seriesFirstIssue: Date;
    companyName?: string;
  }

  // TODO: Validate that series exists and if it matches expected interface
  let refinedSeries: ISeriesIncoming[] = [];

  if (series) {
    // Add each series to the database
    try {
      series.forEach(async (series: ISeriesIncoming) => {
        await prisma.series.upsert({
          where: {
            name_firstIssue: {
              name: series.seriesName,
              firstIssue: new Date(series.seriesFirstIssue),
            },
          },
          create: {
            name: series.seriesName,
            firstIssue: new Date(series.seriesFirstIssue),
            company: {
              connect: {
                name: series.companyName,
              },
            },
          },
          update: {}, // Don't update if info is different
        });
      });
      refinedSeries = series.map((series: ISeriesIncoming) => ({
        seriesName: series.seriesName,
        seriesFirstIssue: new Date(series.seriesFirstIssue), // Make sure first issue is a Date
      }));
    } catch (e: any) {
      console.error((e as Prisma.PrismaClientKnownRequestError).message);
    }
  }

  try {
    // Add character
    const character = await prisma.character.create({
      data: {
        name,
        height,
        city: {
          connect: {
            id: cityId,
          },
        },
        series: {
          create: refinedSeries, // This only works because we already created each series. This part only creates the relation
        },
      },
      include: {
        // Need to do these joins
        series: true,
        city: true,
      },
    });

    return res.status(201).json(character);
  } catch (e: any) {
    console.error((e as Prisma.PrismaClientKnownRequestError).message);
    return res
      .status(400)
      .send(`Character could not be added: ${(e as Prisma.PrismaClientKnownRequestError).message}`);
  }
};
