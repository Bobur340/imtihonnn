import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private repo: Repository<Brand>,
  ) {}

  create(dto) {
    const brand = this.repo.create(dto);
    return this.repo.save(brand);
  }

  findAll() {
    return this.repo.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['products'],
    });
  }
}
