import { Controller, Post, Body, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders') // endi plural, 404 oldini olish uchun
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post('create')
  async create(
    @Headers('cartid') cartId: string,
    @Body() body: { 
      address: { fullName: string; phone: string; address: string };
      paymentMethod: string;
      shippingMethod: string;
      promoCode?: string;
    }
  ) {
    return this.service.createOrder(
      cartId,
      body.address,
      body.paymentMethod,
      body.shippingMethod,
      body.promoCode,
    );
  }
}
