import { NextFunction, Request, Response } from 'express';
import { Character } from '../typeorm/entity/Character';
import AppDataSource from '../data-source';

export const getAllCharacters = async (request: Request, response: Response) => {
    try {
        const characterRepo = AppDataSource.getRepository(Character);
        const allCharacters = await characterRepo.find();
        // returns all characters in Character table with json format:
        //[{"id": , "name": , "height": }, ...]
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
        return response.status(200).json(character)
    } catch (e: any) {
        console.error(e); 
        return response.status(404).send("error finding characters");
    }
}
