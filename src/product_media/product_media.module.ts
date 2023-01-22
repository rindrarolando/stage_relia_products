import { Module } from '@nestjs/common';
import { ProductMediaService } from './product_media.service';
import { ProductMediaController } from './product_media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMedia } from './product_media';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMedia])],
  providers: [ProductMediaService],
  controllers: [ProductMediaController],
})
export class ProductMediaModule {}
