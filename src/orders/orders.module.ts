import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Product } from '../products/entities/product.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PromoCodeModule } from '../promo/promo-code.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Cart, Product]),
    forwardRef(() => CartModule),
    PromoCodeModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
