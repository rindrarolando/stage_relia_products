/* eslint-disable prettier/prettier */
import { typeMedia } from 'src/product_media/type_media';
import { ObjectID } from 'typeorm';
export class Medias {
 _id:ObjectID
  type: typeMedia;
  media_id: string;
}
