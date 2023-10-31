import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Series } from "./Series";
import { City } from "./Cities";

@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    id: number

    @Column( "text" )
    name: string

    @Column( "int" )
    height: number

    // a character can be in many series
    @ManyToMany(() => Series, (series) => series.character)
    // when the entity is the 'owner' of the relationship we add this decorator
    @JoinColumn()
    series: Series[] 

    // a character lives in one city
    @ManyToOne(() => City, (city) => city.character)
    // this isnt needed in a many to one relationship
    //@JoinColumn()
    city: City

}
