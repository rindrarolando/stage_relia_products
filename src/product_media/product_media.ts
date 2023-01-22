/* eslint-disable prettier/prettier */
import { Medias } from 'src/medias/medias';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('product_media')
export class ProductMedia {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  product_id: string;
  @Column()
  media: Medias[];
}
