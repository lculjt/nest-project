import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { IdCard } from "./IdCard"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number


    @OneToOne(() => IdCard, (IdCard) => IdCard.user)
    idCard: IdCard;

}
