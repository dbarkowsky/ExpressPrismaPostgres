import { PrismaClient } from '@prisma/client';
import characters, { ICharacter } from './seedData/characters';
import cities, { ICity } from './seedData/cities';
import serieses, { ISeries } from './seedData/series';

const prisma = new PrismaClient();
async function main() {
  const companies = ['Marvel', 'DC'];
  companies.forEach(async (company) => {
    await prisma.company.upsert({
      where: {
        name: company,
      },
      create: {
        name: company,
      },
      update: {
        name: company,
      },
    });
  });

  cities.forEach(async (city: ICity) => {
    await prisma.city.upsert({
      where: {
        // Using composite key here
        name_latitude_longitude: {
          name: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
        },
      },
      update: {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
      },
      create: {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
      },
    });
  });

  serieses.forEach(async (series: ISeries) => {
    await prisma.series.upsert({
      where: {
        name_firstIssue: {
          name: series.name,
          firstIssue: series.firstIssue,
        },
      },
      update: {
        // Not going to update the companyName
        name: series.name,
        firstIssue: series.firstIssue,
      },
      create: {
        name: series.name,
        firstIssue: series.firstIssue,
        companyName: series.companyName,
      },
    });
  });

  characters.forEach(async (character: ICharacter) => {
    const newCharacter = await prisma.character.upsert({
      where: {
        name: character.name,
      },
      update: {
        city: {
          // Either connect or create if needed
          connectOrCreate: {
            where: {
              name_latitude_longitude: {
                name: character.city.name,
                latitude: character.city.latitude,
                longitude: character.city.longitude,
              },
            },
            create: {
              name: character.city.name,
              latitude: character.city.latitude,
              longitude: character.city.longitude,
            },
          },
        },
        height: character.height,
      },
      create: {
        name: character.name,
        height: character.height,
        city: {
          connectOrCreate: {
            where: {
              name_latitude_longitude: {
                name: character.city.name,
                latitude: character.city.latitude,
                longitude: character.city.longitude,
              },
            },
            create: {
              name: character.city.name,
              latitude: character.city.latitude,
              longitude: character.city.longitude,
            },
          },
        },
      },
    });

    character.series.forEach(async (series) => {
      await prisma.seriesCharacter.upsert({
        where: {
          seriesName_seriesFirstIssue: {
            seriesName: series.name,
            seriesFirstIssue: series.firstIssue,
          },
        },
        create: {
          characterKey: newCharacter.id,
          seriesName: series.name,
          seriesFirstIssue: series.firstIssue,
        },
        update: {
          characterKey: newCharacter.id,
          seriesName: series.name,
          seriesFirstIssue: series.firstIssue,
        },
      });
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
