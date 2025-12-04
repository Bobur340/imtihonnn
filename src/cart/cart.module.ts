import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { CartItem } from './cart-item.entity';
import { ProductsModule } from '../products/products.module'; // <-- shu qator

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    ProductsModule, 
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
