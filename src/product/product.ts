/* eslint-disable prettier/prettier */
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { timeStampEntity } from './../generics/timestamp_entity';
import { statusEnum } from './status_enum';
@Entity('product')
export class Product extends timeStampEntity {
  @ObjectIdColumn()
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
  status: statusEnum;
  
}
