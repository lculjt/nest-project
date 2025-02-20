import { AppDataSource } from "./data-source"
import { Department } from "./entity/Department";
import { Employee } from "./entity/Employee";

AppDataSource.initialize().then(async () => {
    // const d1 = new Department();
    // d1.name = '行政部';

    // const e1 = new Employee();
    // e1.name = '张三二';
    // e1.department = d1;

    // const e2 = new Employee();
    // e2.name = '李四五';
    // e2.department = d1;

    // const e3 = new Employee();
    // e3.name = '王五一';
    // e3.department = d1;

    // // await AppDataSource.manager.save(Department, d1);
    // await AppDataSource.manager.save(Employee, [e1, e2, e3]);


    // const e1 = new Employee();
    // e1.name = '张三1';

    // const e2 = new Employee();
    // e2.name = '李四1';

    // const e3 = new Employee();
    // e3.name = '王五1';

    // const d1 = new Department();
    // d1.name = '董事会';
    // d1.employees = [e1, e2, e3];

    // await AppDataSource.manager.save(Department, d1);

    // const deps = await AppDataSource.manager.find(Department, {
    //     relations: {
    //         employees: true,
    //     }
    // });
    // console.log(deps);

    // const es = await AppDataSource.manager.getRepository(Department)
    //     .createQueryBuilder('d')
    //     .leftJoinAndSelect('d.employees', 'e')
    //     .getMany();

    // console.log(es);
    // console.log(es.map(item => item.employees))

    const es = await AppDataSource.manager
        .createQueryBuilder(Department, 'd')
        .leftJoinAndSelect('d.employees', 'e')
        .getMany();

    console.log(es);
    console.log(es.map(item => item.employees))
}).catch(error => console.log(error))
