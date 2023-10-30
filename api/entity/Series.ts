import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, ManyToOne } from "typeorm";
import { Character } from "./Character";
import { Company } from "./Company";


@Entity()
export class Series {

    @PrimaryGeneratedColumn()
    id: number 

    @Column( "text" )
    name: string

    @Column( "date" )
    firstIssue: Date

    // a series can have many characters in it
    @ManyToMany(() => Character, (character) => character.series)
    character: Character

    // a series is owned by one company
    @ManyToOne(() => Company, (company) => company.series)
    company: Company
}
