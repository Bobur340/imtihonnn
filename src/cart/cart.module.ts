import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    ProductsModule,
    forwardRef(() => OrdersModule), // Circular dependency uchun
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
