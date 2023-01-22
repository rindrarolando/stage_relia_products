import { Medias } from 'src/medias/medias';
import { ObjectID } from 'typeorm';
export declare class ProductMedia {
    _id: ObjectID;
    product_id: string;
    media: Medias[];
}
