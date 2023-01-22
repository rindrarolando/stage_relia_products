/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Medias } from 'src/medias/medias';

export class ProductMediaDto {
  @ApiProperty({ required : true})
  @IsNotEmpty()
  product_id: string;
  @ApiProperty()
  media: Medias[];
}
