import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Employee";

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department, {
        cascade: true,
        onDelete: 'CASCADE'  // 级联删除，一��删除Department，Employee也会被删除
    })
    employees: Employee[];
}