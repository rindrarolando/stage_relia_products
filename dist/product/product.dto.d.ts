import { ObjectID } from 'typeorm';
import { statusEnum } from './status_enum';
export declare class ProductDto {
    _id: ObjectID;
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
