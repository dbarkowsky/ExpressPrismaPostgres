import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Character } from "./Character";
import { Company } from "./Company";


@Entity()
@Index(['name', 'firstIssue'], { unique: true })
export class Series {

    @PrimaryGeneratedColumn()
    id: number 

    @Column( "text" )
    name: string

    @Column( "date" )
    firstIssue: Date

    // a series can have many characters in it
    // may want to look into this https://blog.continium-labs.com/many-to-many-relations-with-typeorm-and-nestjs/
    // if we want to access the join table directly we can but we have to create an entity for it. 
    @ManyToMany(() => Character, (character) => character.series, {
        cascade: true,
        onDelete: "CASCADE"
    })
    // when the entity is the 'owner' of the relationship we add this decorator
    // should add more to this decorator 
    @JoinTable()
    characters: Character[]

    // a series is owned by one company
    @ManyToOne(() => Company, (company) => company.series, {
        cascade: true,
    })
    company: Company
}
