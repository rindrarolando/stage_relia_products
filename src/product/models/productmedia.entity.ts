import { Column, Entity, ObjectID, PrimaryGeneratedColumn } from 'typeorm';
import { MediaEntity } from './media.entity';

@Entity('product_medias')
export class ProductMediaEntity {
  @PrimaryGeneratedColumn()
  _id: ObjectID;

  @Column('product_id')
  product_id: string;

  @Column('medias')
  medias: MediaEntity[];
}
