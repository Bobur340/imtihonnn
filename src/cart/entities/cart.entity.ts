import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("jsonb", { default: [] })
  items: {
    productId: string;
    qty: number;
  }[];
}
