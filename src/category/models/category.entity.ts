/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ObjectID } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  _id: ObjectID;
  
  @Column()  
  name: string;

  @Column()
  description: string;

  @Column()
  parent_id: string;

  constructor(_id: ObjectID, parent_id: string, name: string,description:string) {
    this._id = _id;
    this.parent_id = parent_id;  
    this.name = name;
    this.description = description
  }
}
