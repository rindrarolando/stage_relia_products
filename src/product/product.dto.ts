/* eslint-disable prettier/prettier */
import { ObjectID } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { statusEnum } from './status_enum';
import { IsString, IsNotEmpty } from 'class-validator';

export class ProductDto {
  
  _id: ObjectID; 
  @ApiProperty({ required : true})
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({ required : true})
  @IsString()
  @IsNotEmpty()
  long_description: string;

  @ApiProperty({ required : true})
  @IsString()
  @IsNotEmpty()
  short_description: string;

  @ApiProperty({ required : true})
  @IsNotEmpty()
  general_price: number;

  @ApiProperty({ required : true})
  @IsString()
  @IsNotEmpty()
  unit_measure_id: string;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  quantity: number;
  @ApiProperty()
  after_sales_service: string;

  @ApiProperty({ required : true})
  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @ApiProperty({ enum: ['PUBLIE', 'DEPUBLIE', 'NOUVEAU'], default: 'NOUVEAU'})
  status: statusEnum;

}