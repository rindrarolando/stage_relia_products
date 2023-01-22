/* eslint-disable prettier/prettier */
import { CategoryEntity } from 'src/category/models/category.entity';
import { ProductMedia } from './product_media/product_media';
import { ProductModule } from './product/product.module';
import { Product } from './product/product';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMediaModule } from './product_media/product_media.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      username: 'test',
      password: '',
      database: 'service_product',
      entities: [Product, ProductMedia,CategoryEntity, 'dist/**/**/.entity{.ts, .js}'],
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      synchronize: true,
    }),
    ProductModule,
    ProductMediaModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
