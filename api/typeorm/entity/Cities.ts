import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { Character } from "./Character";
import { Point } from "geojson";

@Entity()
@Index(['name', 'lat', 'long'], { unique: true })
export class City {

    @PrimaryGeneratedColumn()
    id: number 

    @Column( "text" )
    name: string

    @Column( "float8" )
    lat: number

    @Column( "float8" )
    long: number

    // a city can have many characters
    @OneToMany(() => Character, (character) => character.city)
    character: Character[]
}
