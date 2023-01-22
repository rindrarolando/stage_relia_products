/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controllers/category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './models/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
