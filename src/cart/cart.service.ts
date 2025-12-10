import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
    private productService: ProductsService,
  ) {}

  // Cart yaratish yoki olish
  async getCart(cartId?: string) {
    let cart;
    if (cartId) {
      cart = await this.cartRepo.findOne({ 
        where: { id: cartId }, 
        relations: ['items', 'items.product'] 
      });
    }

    if (!cart) {
      // Yangi cart yaratish
      cart = this.cartRepo.create({ items: [] });
      await this.cartRepo.save(cart);
    }

    return cart;
  }

  // Cartga mahsulot qo'shish
  async addToCart(cartId: string, productId: string) {
    const cart = await this.getCart(cartId);
    const id = Number(productId);
    if (isNaN(id)) throw new BadRequestException('Invalid productId');

    const product = await this.productService.findOne(id);
    if (!product) throw new BadRequestException('Product not found');

    const exist = cart.items.find(i => i.product.id === product.id);
    if (exist) {
      exist.quantity += 1;
    } else {
      const newItem = this.cartItemRepo.create({
        cart,
        product,
        quantity: 1,
      });
      cart.items.push(newItem);
    }

    const savedCart = await this.cartRepo.save(cart);

    // Postmanda qaytarish uchun uuid
    return { cartId: savedCart.id, items: savedCart.items };
  }
}
