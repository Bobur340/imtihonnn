// src/promo/entities/promo-code.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class PromoCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column('float')
  discountPercent: number;

  @Column('timestamp')
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
    discount: number | PromiseLike<number>;
}
