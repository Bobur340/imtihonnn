import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repo: Repository<Order>
  ) {}

  async createOrder(items, totalPrice) {
    const order = this.repo.create({ items, totalPrice });
    return this.repo.save(order);
  }

  async addAddress(orderId, address) {
    await this.repo.update(orderId, { address });
    return this.repo.findOne({ where: { id: orderId } });
  }

  async addShipping(orderId, shipping) {
    await this.repo.update(orderId, { shipping });
    return this.repo.findOne({ where: { id: orderId } });
  }

  async addPayment(orderId, paymentMethod) {
    await this.repo.update(orderId, {
      payment: { method: paymentMethod, status: "paid" }
    });
    return this.repo.findOne({ where: { id: orderId } });
  }
}
