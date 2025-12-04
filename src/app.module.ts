import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

// ENTITIES
import { Category } from './categories/entities/category.entity';
import { Brand } from './brands/entities/brand.entity';
import { Product } from './products/entities/product.entity';
import { ProductImage } from './products/product-image.entity';
import { ProductVariant } from './products/product-variant.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/cart-item.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';

@Module({
  imports: [
    // PostgreSQL connection
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
      ],
      synchronize: true,
      logging: false,
    }),

    // ACTIVE MODULES
    CategoriesModule,
    BrandsModule,
    ProductsModule,
    CartModule,
    OrdersModule,
  ],
})
export class AppModule {}
