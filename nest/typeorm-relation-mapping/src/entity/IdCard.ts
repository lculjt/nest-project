import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";

@Entity({
    name: 'id_card',
})
export class IdCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    cardName: string;

    @JoinColumn()
    @OneToOne(() => User, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: User;
}
