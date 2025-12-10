import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private repo: Repository<Brand>,
  ) {}

  create(name: string) {
    const brand = this.repo.create({ name });
    return this.repo.save(brand);
  }

  findAll() {
    return this.repo.find({
      relations: ['products'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['products'],
    });
  }
}
