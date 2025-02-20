import { AppDataSource } from "./data-source"
import { User } from "./entity/User";
import { IdCard } from "./entity/IdCard";

AppDataSource.initialize().then(async () => {
    // const user = new User();
    // user.firstName = "yp";
    // user.lastName = "li";
    // user.age = 18;

    // const idCard = new IdCard();
    // idCard.cardName = 'li yp';
    // idCard.user = user;

    // // await AppDataSource.manager.save(user);
    // await AppDataSource.manager.save(idCard);

    // const ics = await AppDataSource.manager.find(IdCard, {
    //     relations: {
    //         user: true,
    //     }
    // });
    // console.log(ics);

    // const ics = await AppDataSource.manager.getRepository(IdCard)
    //     .createQueryBuilder('ic').leftJoinAndSelect('ic.user', 'u').getMany();
    // console.log(ics);

    // const ics = await AppDataSource.manager.createQueryBuilder(IdCard, "ic")
    //     .leftJoinAndSelect("ic.user", "u")
    //     .getMany();
    // console.log(ics);

    const user = await AppDataSource.manager.find(User, {
        relations: {
            idCard: true
        }
    });
    console.log(user);

}).catch(error => console.log(error))
