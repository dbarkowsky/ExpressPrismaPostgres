import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number 

    @Column("text")
    name: string

    @Column("double")
    latitude: number

    @Column("double")
    longitude: number
}
