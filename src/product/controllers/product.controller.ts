/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from '../services/product.service';

@ApiTags('Products module')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/recent_products_visited/:category_id')
  @ApiOperation({ summary: 'Get all recently visited products' })
  @ApiResponse({
    status: 200,
    description: 'All recently visited products',
  })
  @ApiResponse({
    status: 403,  
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getRecentlyVisitedProducts(@Param('category_id') categoryId: string) {
    try {
      // eslint-disable-next-line prettier/prettier
      const listProducts = await this.productService.getRecentVisitedProducts(categoryId);
      return {
        data: listProducts,
        status: true,
        message: 'All recent products visited list',
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message: 'An error occured while fetching products list',
      };
    }
  }

  @Get('/product_medias/:id')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiProperty({
    type: String,
    description: 'This is the product id',
  })
  @ApiResponse({
    status: 200,
    description: 'All categories',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getProductMedias(@Param('id') product_id: string) {
    try {
      const productMedias = await this.productService.getProductMedias(
        product_id,
      );
      return {
        data: productMedias,
        status: true,
        message: 'All medias for product :' + product_id,
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message:
          'An error occured while fetching medias of product :' + product_id,
      };
    }
  }

  @Get('/can_interest')
  @ApiOperation({ summary: 'Get all products that can interest' })
  @ApiResponse({
    status: 200,
    description: 'All products that can interest',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getProductsThatCanInterest() {
    try {
      // eslint-disable-next-line prettier/prettier
      const listProducts = await this.productService.getRandomPublishedProducts();
      return {
        data: listProducts,
        status: true,
        message: 'All products that can interest',
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message: 'An error occured while fetching products list',
      };
    }
  }

  @Get('/products_of_the_moment')
  @ApiOperation({ summary: 'Get all products of the moment' })
  @ApiResponse({
    status: 200,
    description: 'All products of the moment',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getProductsOfTheMoment() {
    try {
      // eslint-disable-next-line prettier/prettier
      const listProducts = await this.productService.getLastPublishedProducts();
      return {
        data: listProducts,
        status: true,
        message: 'All products of the moment',
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message: 'An error occured while fetching products list',
      };
    }
  }

  @Get('/test')
  async getNumberOfParentCategories() {
    const listCategories = await this.productService.getAllCategories();
    // eslint-disable-next-line prettier/prettier
    const number = await this.productService.getRecentVisitedProducts(null);
    return number;
  } 
}
