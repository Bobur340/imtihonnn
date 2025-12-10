import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Brendning unikal identifikatori',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Apple',
    description: 'Brend nomi',
  })
  name: string;

  @OneToMany(() => Product, (product) => product.brand)
  @ApiProperty({
    description: 'Ushbu brendga tegishli mahsulotlar ro‘yxati',
    type: () => [Product],
  })
  products: Product[];
}
