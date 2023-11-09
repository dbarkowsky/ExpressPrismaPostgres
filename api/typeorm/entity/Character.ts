import { Entity, PrimaryGeneratedColumn, Index, Column, ManyToMany, ManyToOne } from "typeorm";
import { Series } from "./Series";
import { City } from "./Cities";

@Entity()
@Index(['name', 'height'], { unique: true })
export class Character {

    @PrimaryGeneratedColumn()
    id: number

    @Column( "text" )
    name: string

    @Column( "int" )
    height: number

    // a character can be in many series
    @ManyToMany(() => Series, (series) => series.characters)
    series: Series[] 

    // a character lives in one city
    @ManyToOne(() => City, (city) => city.character)
    // this isnt needed in a many to one relationship
    //@JoinColumn()
    city: City

}
