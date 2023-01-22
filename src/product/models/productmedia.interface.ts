import { ObjectID } from 'typeorm';
import { MediaEntity } from './media.entity';

export interface ProductMedia {
  _id?: ObjectID;
  product_id?: string;
  medias?: MediaEntity[];
}
