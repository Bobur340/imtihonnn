import { Controller, Post, Get, Body, Param, Inject, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { OrdersService } from 'src/orders/orders.service';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService, 
  ) {}

  @Post('add-item')
  async addItem(@Body() body: { cartId: string; productId: string }) {
    return this.cartService.addToCart(body.cartId, body.productId);
  }

  // Yangi GET endpoint
  @Get(':id')
  async getCart(@Param('id') cartId: string) {
    return this.cartService.getCart(cartId);
  }
}
