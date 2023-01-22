import { ObjectID } from 'typeorm';
import { StatusEnum } from '../enums/statusEnum';
export interface Interface {
    _id?: ObjectID;
    category_id?: string;
    name?: string;
    long_description?: string;
    short_description?: string;
    general_price?: number;
    unit_mesure_id?: string;
    quantity?: number;
    after_sales_service?: string;
    owner_id?: string;
    status?: StatusEnum;
}
