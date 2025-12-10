import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductImage } from './entities/product-image.entity';
import { Category } from '../categories/entities/category.entity';
import { Brand } from '../brands/entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) {}

  async create(dto: any) {
    const product = this.repo.create({
      title: dto.title,
      price: dto.price,
      specs: dto.specs,
      variants: dto.variants,
      images: dto.images,
    });

    // category va brand bog‘lash
    product.category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    product.brand = await this.brandRepo.findOneBy({ id: dto.brandId });

    return this.repo.save(product);
  }

  findAll() {
    return this.repo.find({ relations: ['category', 'brand', 'variants', 'images'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['category', 'brand', 'variants', 'images'],
    });
  }
}
