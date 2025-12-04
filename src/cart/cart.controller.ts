import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private service: CartService) {}

  @Get()
  getCart(@Headers('cartid') cartId: string) {
    return this.service.getCart(cartId);
  }

  @Post('add')
  add(@Headers('cartid') cartId: string, @Body() body: any) {
    return this.service.addToCart(cartId, body.productId);
  }
}
