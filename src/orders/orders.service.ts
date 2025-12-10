import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Product } from '../products/entities/product.entity';
import { PromoCodeService } from '../promo/promo-code.service'; // qo‘shildi

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private promoCodeService: PromoCodeService, // qo‘shildi
  ) {}

  async createOrder(
    cartId: string,
    address: { fullName: string; phone: string; address: string },
    paymentMethod: string,
    shippingMethod: string,
    promoCode?: string, // yangi argument
  ) {
    // Cart va CartItem larni olish
    const cart = await this.cartRepo.findOne({
      where: { id: cartId },
      relations: ['items', 'items.product'],
    });

    if (!cart) throw new Error('Cart not found');

    const items = cart.items.map(item => ({
      productId: String(item.product.id),
      qty: item.quantity,
    }));

    // Total price hisoblash
    let totalPrice = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    // Promo kod mavjud bo‘lsa, chegirma qo‘llash
    if (promoCode) {
      const promo = this.promoCodeService.findByCode(promoCode) as unknown as { discountPercent: number; expiresAt: Date } | null;
      if (promo && promo.expiresAt > new Date()) {
        totalPrice = totalPrice * (1 - promo.discountPercent); // chegirma
      }
    }

    const order = this.orderRepo.create({
      items,
      totalPrice,
      address,
      payment: { method: paymentMethod, status: 'pending' },
      shipping: { method: shippingMethod },
    });

    return this.orderRepo.save(order);
  }

  async addAddress(orderId: string, address: { fullName: string; phone: string; address: string }) {
    const order = await this.orderRepo.findOneBy({ id: orderId });
    if (!order) throw new Error('Order not found');
    order.address = address;
    return this.orderRepo.save(order);
  }

  async addShipping(orderId: string, shipping: { method: string }) {
    const order = await this.orderRepo.findOneBy({ id: orderId });
    if (!order) throw new Error('Order not found');
    order.shipping = shipping;
    return this.orderRepo.save(order);
  }

  async addPayment(orderId: string, payment: { method: string }) {
    const order = await this.orderRepo.findOneBy({ id: orderId });
    if (!order) throw new Error('Order not found');
    order.payment = { method: payment.method, status: 'paid' };
    return this.orderRepo.save(order);
  }

  async findByCode(code: string): Promise<{ discountPercent: number; expiresAt: Date } | null> {
    // Temporary stub implementation to satisfy return type
    return null;
  }
}
