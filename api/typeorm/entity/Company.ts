import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Series } from "./Series";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column( "text" )
    name: string

    // a company can own many series
    @OneToMany(() => Series, (series) => series.company)
    series: Series[]
}
