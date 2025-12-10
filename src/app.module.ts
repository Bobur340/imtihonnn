import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { PromoCodeModule } from './promo/promo-code.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

// ENTITIES
import { Category } from './categories/entities/category.entity';
import { Brand } from './brands/entities/brand.entity';
import { Product } from './products/entities/product.entity';
import { ProductImage } from './products/entities/product-image.entity';
import { ProductVariant } from './products/entities/product-variant.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cart-item.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { PromoCode } from './promo/entities/promo-code.entity';

// SERVICES (seed uchun kerak)
import { CategoriesService } from './categories/categories.service';
import { BrandsService } from './brands/brands.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT || 5432),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'shopdb',
      entities: [
        Category,
        Brand,
        Product,
        ProductImage,
        ProductVariant,
        Cart,
        CartItem,
        Order,
        OrderItem,
        PromoCode,
      ],
      synchronize: true,
      logging: false,
    }),

    CategoriesModule,
    BrandsModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    PromoCodeModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private categoriesService: CategoriesService,
    private brandsService: BrandsService,
  ) {}

  async onApplicationBootstrap() {
    console.log('🌱 Seeding default data...');

    // Default Categories
    const defaultCategories = ['Apple', 'Nokia', 'Xiaomi'];
    for (const name of defaultCategories) {
      await this.categoriesService.create(name).catch(() => {});
    }

    // Default Brands
    const defaultBrands = ['Apple', 'Samsung', 'Xiaomi', 'Poco', 'Honor'];
    for (const name of defaultBrands) {
      await this.brandsService.create(name).catch(() => {});
    }

    console.log('✅ Seed completed');
  }
}
