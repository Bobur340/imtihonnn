import { Controller, Post, Body } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';

@Controller('promo')
export class PromoCodeController {
  constructor(private promoService: PromoCodeService) {}

  // Promo kod yaratish
  @Post('create')
  create() {
    return this.promoService.createPromoCode();
  }

  // Promo kodni ishlatish
  @Post('apply')
  apply(@Body() body: { code: string }) {
    return this.promoService.applyPromoCode(body.code);
  }
}
