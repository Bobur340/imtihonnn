import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, (cat) => cat.products)
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @OneToMany(() => ProductVariant, (v) => v.product, { cascade: true })
  variants: ProductVariant[];

  @OneToMany(() => ProductImage, (img) => img.product, { cascade: true })
  images: ProductImage[];

  @Column({ type: 'jsonb', nullable: true })
  specs: any;  // Texnik ma’lumotlar (jadval ko‘rinishida)
}
