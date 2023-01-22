/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { typeMedia } from "src/product_media/type_media";

export class mediaDto {
  @ApiProperty({ enum: ['video', 'image'],default: 'image'})
  type: typeMedia;
  @ApiProperty({ description: 'id of media' })
  media_id: string;
}
