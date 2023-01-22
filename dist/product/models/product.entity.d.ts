import { ObjectID } from 'typeorm';
import { StatusEnum } from '../enums/statusEnum';
import { TimestampEntity } from '../utils/timestampEntity';
export declare class ProductEntity extends TimestampEntity {
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
    status: StatusEnum;
}
