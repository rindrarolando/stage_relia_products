/* eslint-disable prettier/prettier */
import { ProductMediaService } from './../product_media/product_media.service';
import { ProductMediaController } from './../product_media/product_media.controller';
import { ProductMedia } from './../product_media/product_media';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './models/product.entity';
import { ProductMediaEntity } from './models/productmedia.entity';
import { CategoryEntity } from 'src/category/models/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductMedia, ProductEntity, ProductMediaEntity, CategoryEntity])],
  controllers: [ProductController, ProductMediaController, ProductController],
  providers: [ProductService,ProductMediaService],

})
export class ProductModule {}
