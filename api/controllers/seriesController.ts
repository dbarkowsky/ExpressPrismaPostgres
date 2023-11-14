import { Request, Response } from 'express';
import { Series } from '../typeorm/entity/Series';
import { Company } from '../typeorm/entity/Company';
import { Character } from '../typeorm/entity/Character';
import AppDataSource from '../data-source';
import { request } from 'http';


export const getAllSeries = async (request: Request, response: Response) => {
    try {
        const seriesRepo = AppDataSource.getRepository(Series);
        const allSeries = await seriesRepo.find();
        return response.status(200).json(allSeries);
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error finding all series");
    }
};

export const getSeries = async (request: Request, response: Response) => {
    const inId = request.query.id as unknown; 
    console.log(inId);
    if (!inId) return response.status(400).send('No series Id given.');
    try {
        const seriesRepo = AppDataSource.getRepository(Series);
        const series = await seriesRepo.findOne({
            where: {
                id: inId as number, 
            }
        })
        return response.status(200).json(series);
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error finding this series");
    }
}

export const updateSeries = async (request: Request, response: Response) => {
    const inId = request.query.id as unknown; 
    const {name, firstIssue} = request.body;
    if (!inId) return response.status(400).send('No series id given.');

    try {
        const update = await AppDataSource
            .createQueryBuilder()
            .update(Series)
            .set({
                name: name, 
                firstIssue: firstIssue
            })
            .where("id = :id", {id: inId})
            .execute();

        return response.status(200).json(update);
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error updating series");
    }
}

export const addSeries = async (request: Request, response: Response) => {
    const { name, firstIssue, characters, company } = request.body;
    // test to see if name or first issue werent provided
    if (!name || !firstIssue) {
        return response.status(400).send('name or first Issue are missing from body, but they are required');
    }
    const seriesRepo = AppDataSource.getRepository(Series);
    const companyRepo = AppDataSource.getRepository(Company);
    const characterRepo = AppDataSource.getRepository(Character);

    // check to see if series already exists
    try {
        const testSeries = await seriesRepo.findOne({
            where: {
                name: name, 
                firstIssue: firstIssue
            }
        })
        if (testSeries != null){
            return response.status(400).send('Series already exists in repo')
        }
    } catch (e: any) { 
        console.error(e);
        return response.status(400).send('Error checking if series exists.');
    }

    // check if company exists
    try {
        const companyCheck = await companyRepo.findOne({
            where: {
                name: company
            }
        })
        // add company if it doesnt exist -- likely wouldnt want to do this here. 
        if (companyCheck == null){
            const addCompany = await AppDataSource
              .createQueryBuilder()
              .insert()
              .into(Company)
              .values([
                {name: company}
              ])
              .execute();
        }

    } catch (e: any) { 
        console.error(e);
        return response.status(400).send('Error checking company list.');
    }

    // add the new series
    try {
        const curCompany = await companyRepo.findOne({
            where: { 
                name: company
            }
        });

        // different way of creating a new row
        // this works but I cant see the updates on the ralationship anywhere. 
        const newSeries = new Series();
        newSeries.name = name; 
        newSeries.firstIssue = firstIssue;
        newSeries.company = curCompany;
        newSeries.characters = characters;
        const add = await seriesRepo.manager.save(newSeries);

        // if there are no characters to add we stop here
        return response.status(200).json(add);
    } catch (e: any) { 
        console.error(e);
        return response.status(400).send('Error adding character.');
    }

}

export const deleteSeries = async (request: Request, response: Response) => {
    const inId = request.query.id;
    if (!inId) return response.status(400).send('No series id given.');

    try {
        const delSeries = await AppDataSource
          .createQueryBuilder()
          .delete()
          .from(Series)
          .where("id = :id", {id:inId})
          .execute();
        return response.status(200).json(delSeries);
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error deleting character");
    }
}
