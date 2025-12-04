import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private repo: Repository<Cart>,
    private productService: ProductsService
  ) {}

  async getCart(cartId: string) {
    let cart = await this.repo.findOne({ where: { id: cartId } });
    if (!cart) {
      cart = this.repo.create();
      await this.repo.save(cart);
    }
    return cart;
  }

  async addToCart(cartId: string, productId: string) {
    const cart = await this.getCart(cartId);

    const exist = cart.items.find(i => i.productId === productId);
    if (exist) exist.qty += 1;
    else cart.items.push({ productId, qty: 1 });

    return this.repo.save(cart);
  }
}
