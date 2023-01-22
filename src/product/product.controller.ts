/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ProductMediaDto } from './../product_media/product_media.dto';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { async } from 'rxjs';
import { statusEnum } from './status_enum';

@ApiHeader({
  name: 'Produit',
  description: 'Api pour ajouter et modifier les produits',
})
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/save')
  @ApiCreatedResponse({
    description: 'Add product succes',
  })
  @ApiBadRequestResponse({ description: 'Product cannot registre' })
  async createProduct(@Body() createProduct: ProductDto, createProdMedia: ProductMediaDto) {
    let response:object, statusAbonnement: boolean , messageDeRetour: string;
    /* createProduct.status = statusEnum.publie; */
    try {
      response = await this.productService.create(createProduct, createProdMedia);
      statusAbonnement = true;
      messageDeRetour = 'Add product succes';
    } catch (error) {
      statusAbonnement = false;
      messageDeRetour = 'error,try again: ' + error.name;
    }
    return {
      data: response,
      status: statusAbonnement,
      message: messageDeRetour
  };
}

@Post('save/publier/:status') 
  @ApiCreatedResponse({
    description: 'publication succes',
  })
  @ApiBadRequestResponse({ description: 'Product cannot publish' })
  async createAndPublie(@Body() createProduct: ProductDto, createProdMedia: ProductMediaDto, @Param('status') status: statusEnum) {
    let response:object, statusAbonnement: boolean , messageDeRetour: string;
    const myStatus = status.toUpperCase() as statusEnum;
    Logger.log(myStatus)
    try {
      response = await this.productService.publicationProduct(createProduct, createProdMedia,myStatus);
      statusAbonnement = true;
      messageDeRetour = 'Add product succes and publish';
    } catch (error) {
      statusAbonnement = false;
      messageDeRetour = 'error,try again: ' + error.name;
    }
    return {
      data: response,
      status: statusAbonnement,
      message: messageDeRetour
  };
}

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'Update product succes',
  })
  @ApiBadRequestResponse({ description: 'Product cannot Update' })
  async updateProduct(@Param('id') id: ObjectID, @Body() productDto: ProductDto, createProdMedia: ProductMediaDto){
    let response:object, statusAbonnement: boolean , messageDeRetour: string;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    const idOfProduct = mongoose.Types.ObjectId(id);
    try {
      response = await this.productService.update(id,productDto,createProdMedia);
      statusAbonnement = true;
      messageDeRetour = 'Update product succes';
    } catch (error) {
      statusAbonnement = false;
      messageDeRetour = 'update error,try again: ' + error.description;
    }
    return {
      data: response,
      status: statusAbonnement,
      message: messageDeRetour
  };
}

@Patch('update/publish/:id')
  @ApiCreatedResponse({
    description: 'Update product succes',
  })
  @ApiBadRequestResponse({ description: 'Product cannot Update' })
  async updatePublishProduct(@Param('id') id: ObjectID, @Body() productDto: ProductDto, createProdMedia: ProductMediaDto,@Body('status') status:string){
    let response:object, statusAbonnement: boolean , messageDeRetour: string;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    const idOfProduct = mongoose.Types.ObjectId(id);
    Logger.log(status)
    try {
      response = await this.productService.updatePublicationProduct(idOfProduct,productDto,createProdMedia,status);
      statusAbonnement = true;
      messageDeRetour = 'Update product succes';
    } catch (error) {
      statusAbonnement = false;
      messageDeRetour = 'update error,try again: ' + error.description;
    }
    return {
      data: response,
      status: statusAbonnement,
      message: messageDeRetour
  };
}

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
}
