import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post('create')
  create(@Body() body) {
    return this.service.createOrder(body.items, body.totalPrice);
  }

  @Post('address')
  address(@Body() body) {
    return this.service.addAddress(body.orderId, body);
  }

  @Post('shipping')
  shipping(@Body() body) {
    return this.service.addShipping(body.orderId, { method: body.method });
  }

  @Post('payment')
  payment(@Body() body) {
    return this.service.addPayment(body.orderId, body.method);
  }
}
