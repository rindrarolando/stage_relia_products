/* eslint-disable prettier/prettier */
import { Column, Entity, ObjectID, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/statusEnum';
import { TimestampEntity } from '../utils/timestampEntity';

@Entity('products')
export class ProductEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  _id: ObjectID;

  @Column('category_id')
  category_id: string;

  @Column('name')
  name: string;

  @Column('long_description')
  long_description: string;

  @Column('short_description')
  short_description: string;

  @Column('general_price')
  general_price: number;

  @Column('unit_measure_id')
  unit_measure_id: string;

  @Column('quantity')
  quantity: number;

  @Column('after_sales_service')
  after_sales_service: string;

  @Column('owner_id')
  owner_id: string;

  @Column('status')
  status: StatusEnum;
}
