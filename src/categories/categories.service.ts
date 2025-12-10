import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) {}

  create(name: string) {
    const cat = this.repo.create({ name });
    return this.repo.save(cat);
  }

  findAll() {
    return this.repo.find({
      relations: ['products'],
    });
  }

  findOne(id: number) {
    return this.repo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .where('category.id = :id', { id })
      .getOne();
  }
}
