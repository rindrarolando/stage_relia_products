import { ObjectID } from 'typeorm';
import { timeStampEntity } from './../generics/timestamp_entity';
import { statusEnum } from './status_enum';
export declare class Product extends timeStampEntity {
    _id: ObjectID;
    category_id: string;
    name: string;
    long_description: string;
    short_description: string;
    general_price: number;
    unit_measure_id: string;
    quantity: number;
    after_sales_service: string;
    owner_id: string;
    status: statusEnum;
}
