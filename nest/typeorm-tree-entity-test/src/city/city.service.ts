import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CityService {
  @InjectEntityManager()
  private manager: EntityManager;

  async create(createCityDto: CreateCityDto) {
    const city = new City();
    city.name = createCityDto.name;
    if (createCityDto.parentId) {
      const parent = await this.manager.findOne(City, {
        where: {
          id: createCityDto.parentId,
        },
      });
      if (parent) city.parent = parent;
    }
    await this.manager.save(City, city);
  }

  async findRootCities() {
    return await this.manager.getTreeRepository(City).findRoots();
  }

  async findAll() {
    return await this.manager.getTreeRepository(City).findTrees();
  }

  async findAllChildrenById(id: number) {
    const parent = await this.manager.findOne(City, {
      where: {
        id: Number(id),
      },
    });
    console.log(parent);
    return this.manager.getTreeRepository(City).findDescendantsTree(parent);
  }

  async findAllAncestorsById(id: number, flat: boolean) {
    const children = await this.manager.findOne(City, {
      where: {
        id: Number(id),
      },
    });
    return flat
      ? this.manager.getTreeRepository(City).findAncestors(children)
      : this.manager.getTreeRepository(City).findAncestorsTree(children);
  }
}
