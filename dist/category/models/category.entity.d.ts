import { ObjectID } from 'typeorm';
export declare class CategoryEntity {
    _id: ObjectID;
    name: string;
    description: string;
    parent_id: string;
    constructor(_id: ObjectID, parent_id: string, name: string, description: string);
}
