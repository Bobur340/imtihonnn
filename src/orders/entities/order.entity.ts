import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("jsonb", { nullable: true })
  address: {
    fullName: string;
    phone: string;
    address: string;
  };

  @Column("jsonb", { nullable: true })
  shipping: {
    method: string;
  };

  @Column("jsonb", { nullable: true })
  payment: {
    method: string;
    status: string;
  };

  @Column("jsonb", { default: [] })
  items: {
    productId: string;
    qty: number;
  }[];

  @Column()
  totalPrice: number;
}
