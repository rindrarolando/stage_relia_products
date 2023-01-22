import { ObjectID } from 'typeorm';
export interface Category {
    _id?: ObjectID;
    name?: string;
    description?: string;
    parent_id?: string;
}
