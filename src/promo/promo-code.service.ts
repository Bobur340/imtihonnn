import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromoCode } from './entities/promo-code.entity';

@Injectable()
export class PromoCodeService {
  constructor(
    @InjectRepository(PromoCode)
    private promoRepo: Repository<PromoCode>,
  ) {}

  // Promo kod yaratish (50% chegirma, 5 soat amal qiladi)
  async createPromoCode(): Promise<PromoCode> {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 5); // 5 soat amal qiladi

    const promo = this.promoRepo.create({
      code,
      discountPercent: 0.5,
      expiresAt,
    });

    return this.promoRepo.save(promo);
  }

  // Promo kodni tekshirish
  async findByCode(code: string): Promise<PromoCode | null> {
    const promo = await this.promoRepo.findOne({ where: { code } });
    return promo || null;
  }

  // Promo kodni qo‘llash va chegirma olish
  async applyPromoCode(code: string): Promise<number> {
    const promo = await this.findByCode(code);
    if (!promo) throw new BadRequestException('Invalid promo code');
    if (promo.expiresAt < new Date()) throw new BadRequestException('Promo code expired');
    return promo.discountPercent;
  }
}
