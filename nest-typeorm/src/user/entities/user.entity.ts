import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({
    name: 'test_user',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
