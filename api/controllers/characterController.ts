import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { ISeries } from '../prisma/seedData/series';

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

  // Can use generated types to pre-make data
  let characterData: Prisma.CharacterCreateInput = {
    name,
    height,
  };

  // Add city if specified
  if (cityId !== undefined) {
    // Find a matching city
    try {
      const matchingCity = await prisma.city.findUnique({ where: { id: cityId } });

      const cityConnection: Prisma.CityWhereUniqueInput = {
        name_latitude_longitude: {
          name: matchingCity.name,
          latitude: matchingCity.latitude,
          longitude: matchingCity.longitude,
        },
      };
      characterData = { ...characterData, city: cityId ? { connect: cityConnection } : {} };
    } catch {
      console.warn('City not found database');
    }
  }

  try {
    // Add character
    const character = await prisma.character.create({
      data: characterData,
    });

    if (series) {
      // Connect series entries
      const seriesList = [];
      series.forEach(async (series: ISeries) => {
        try {
          const newSeries = await prisma.seriesCharacter.upsert({
            where: {
              seriesName_seriesFirstIssue_characterKey: {
                seriesName: series.name,
                seriesFirstIssue: new Date(series.firstIssue),
                characterKey: character.id,
              },
            },
            create: {
              characterKey: character.id,
              seriesName: series.name,
              seriesFirstIssue: new Date(series.firstIssue),
            },
            update: {
              characterKey: character.id,
              seriesName: series.name,
              seriesFirstIssue: new Date(series.firstIssue),
            },
          });
          seriesList.push(newSeries);
        } catch (e) {
          console.warn('Series could not be added.');
          console.warn(e);
        }
      });

      // character = { ...character, series: seriesList };
    }

    return res.status(201).json(character);
  } catch (e: any) {
    console.error((e as Prisma.PrismaClientKnownRequestError).message);
    return res
      .status(400)
      .send(`Character could not be added: ${(e as Prisma.PrismaClientKnownRequestError).message}`);
  }
};
