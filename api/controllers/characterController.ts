import { NextFunction, Request, Response } from 'express';
import { Character } from '../typeorm/entity/Character';
import { City } from '../typeorm/entity/Cities';
import AppDataSource from '../data-source';
import { request } from 'http';

export const getAllCharacters = async (request: Request, response: Response) => {
    try {
        const characterRepo = AppDataSource.getRepository(Character);
        const allCharacters = await characterRepo.find();
        // returns all characters in Character table with json format:
        // [{"id": , "name": , "height": }, ...]
        return response.status(200).json(allCharacters);
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error finding characters");
    }
};

export const getCharacter = async (request: Request, response: Response) => {
    const inName = request.query.name as unknown;
    if (!inName) return response.status(400).send('No character name given.');
    
    try {
        const characterRepo = AppDataSource.getRepository(Character);
        const character = await characterRepo.findOne({
            where: {
                name: inName as string,
            }
        });
        // returns single character with json format: 
        // {"id": , "name": , "height": }
        return response.status(200).json(character)
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error finding characters");
    }
}

export const updateCharacter = async (request: Request, response: Response) => {
    const inId = request.query.id as unknown;
    const {name, height, city} = request.body;
    if (!inId) return response.status(400).send('No character id given.');

    try {
        const update = await AppDataSource
            .createQueryBuilder()
            .update(Character)
            .set({
                name: name, 
                height: height, 
                city: city
            })
            .where("id = :id", {id: inId})
            .execute();
        
        return response.status(200).json(update);
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error updating character");
    }
}

// have to investigate how to delete a character - series relationship when Series "owns" it
export const deleteCharacter =async (request: Request, response: Response) => {
    const inId = request.query.id; 
    if (!inId) return response.status(400).send('No character id given.');

    try { 
        const deleteChar = await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Character)
            .where("id = :id", {id: inId})
            .execute();
        return response.status(200).json(deleteChar);
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error deleting character");
    }
}

export const addCharacter =async (request: Request, response: Response) => {
    const { name, height, series, city } = request.body;
    if (!name || !height) {
        return response.status(400).send('name or height are missing from body, but they are required');
    }

    // if the city is given check to see if it exists
    if (city !== undefined) {
        try { 
            await AppDataSource.getRepository(City).findOne({
                where: {
                    id: city,
                }
            })
        } catch (e: any) { 
            console.error(e);
            return response.status(400).send('City not found.');
        }
    }

    //need to add functionality to add series to character
    try {
        const addChar = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Character)
            .values([
                {name: name, height: height, city: city, series: series}
            ])
            .execute(); 
            return response.status(200).json(addChar)

    } catch (e: any) { 
            console.error(e);
            return response.status(400).send('Error adding character.');
    }
    
}
