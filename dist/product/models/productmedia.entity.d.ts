import { ObjectID } from 'typeorm';
import { MediaEntity } from './media.entity';
export declare class ProductMediaEntity {
    _id: ObjectID;
    product_id: string;
    medias: MediaEntity[];
}
