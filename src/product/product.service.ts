/* eslint-disable prettier/prettier */
import { statusEnum } from './status_enum';
import { Logger } from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { typeMedia } from 'src/product_media/type_media';
import { ProductMedia } from './../product_media/product_media';
import { ProductMediaDto } from './../product_media/product_media.dto';
import { Product } from './product';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';;
import { ApiQuery } from '@nestjs/swagger';
import { CategoryEntity } from 'src/category/models/category.entity';

@Injectable()
export class ProductService {
  mongoose = require('mongoose');
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductMedia)
    private productMediaRepository: Repository<ProductMedia>,
    
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ApiQuery({ name: 'type', enum: typeMedia })
  async create(product: ProductDto, productMedia: ProductMediaDto ): Promise<Product> {
    const response = [];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    product.status = statusEnum.nouveau;
    Logger.log(typeof product.status)
    const responseProduct = await this.productRepository.save(product);
    response.push(responseProduct)
    const idOfProduct = mongoose.Types.ObjectId((responseProduct)._id);
    productMedia = {
      product_id: idOfProduct,
      media:[ {
        _id:idOfProduct,
         type: typeMedia.image,
         media_id:'3az2ezs3e5r1de45qs'
        },
        {
          _id:idOfProduct,
           type: typeMedia.video,
           media_id:'8az2ezs3e5r1de4l68'
          }
      ]
    }
    const responseProductMedia = await this.productMediaRepository.save(productMedia);
    response.push(responseProductMedia);
    for (let i = 0; i < response.length; i++) {
      return response[i];
    }  
   }

   async getIdProductMedia(id:ObjectID):Promise<ObjectID> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    const idOfProduct = mongoose.Types.ObjectId(id);
    const response = await this.productMediaRepository.findOneBy({ product_id: idOfProduct });
    return response._id;
   }

   async update(id: ObjectID, product:ProductDto, productMedia: ProductMediaDto): Promise<Product> {
    const response = [];
     // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    const idOfProduct = mongoose.Types.ObjectId(id);
    const newProduct = await this.productRepository.preload({ _id: idOfProduct, ...product});
    const responseProduct = await this.productRepository.save(newProduct)
    response.push(responseProduct);
    //pour le moment, les product_media et media restent en données statiques
    productMedia = {
      product_id: idOfProduct,
      media:[ {
        _id: idOfProduct,
         type: typeMedia.video,
         media_id:'3az2ezs3e5r1de45qs'
        },
        {
          _id:idOfProduct,
           type: typeMedia.image,
           media_id:'8az2ezs3e5r1de4l68mety'
          }
      ]
    }
    const idProductMedia = mongoose.Types.ObjectId((await this.getIdProductMedia(id)).toString())
    const newProductMedia = await this.productMediaRepository.preload({ _id: idProductMedia, ...productMedia});
    const responseProductMedia = await this.productMediaRepository.save(newProductMedia);
    response.push(responseProductMedia);
    return responseProduct;
  }

  async updateStatus(id: ObjectID, product:ProductDto, status:statusEnum): Promise<Product> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    const idOfProduct = mongoose.Types.ObjectId(id);
    product.status = status
    const newProduct = await this.productRepository.preload({ _id: idOfProduct, ...product});
    const responseProduct = await this.productRepository.save(newProduct)
  return responseProduct;
   }

  async publicationProduct(product:ProductDto, productMedia: ProductMediaDto, status:statusEnum): Promise<Product> {
    const myProduct = this.create(product,productMedia);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    const idOfProduct = mongoose.Types.ObjectId((await myProduct)._id);
    let updateProduct;
   if (status == statusEnum.publie) updateProduct = await this.updateStatus(idOfProduct,product,status)
   return updateProduct;
   }

   async updatePublicationProduct(id:ObjectID,product:ProductDto, productMedia: ProductMediaDto, status:string): Promise<Product> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    const idOfProduct = mongoose.Types.ObjectId(id);
    const myStatus = status.toUpperCase() as statusEnum;
    //const myProduct = this.update(idOfProduct,product,productMedia);
    let updateProduct;Logger.log(myStatus)
   if (myStatus == statusEnum.publie) updateProduct = await this.updateStatus(idOfProduct,product,myStatus)
   else updateProduct = await this.updateStatus(idOfProduct,product,myStatus)
   return updateProduct;
   }
   
   async setIntRandomArray() {
    const documentsProductsNumber = await this.productRepository.count();
    const productsNumber = documentsProductsNumber - 1;
    const intRandomArray = [];

    if(documentsProductsNumber >= 10) {
      while (intRandomArray.length < 10) {
        const intRandomTemporary = Math.floor(Math.random() * productsNumber) + 1;
  
        if (intRandomArray.indexOf(intRandomTemporary) === -1)
          intRandomArray.push(intRandomTemporary);
      }
  
      return intRandomArray;
    } else {
      while (intRandomArray.length < documentsProductsNumber) {
        const intRandomTemporary = Math.floor(Math.random() * productsNumber) + 1;
  
        if (intRandomArray.indexOf(intRandomTemporary) === -1)
          intRandomArray.push(intRandomTemporary);
      }
  
      return intRandomArray;
    }
    
  }

  async getAllValidProducts() {
    const listProducts = await this.productRepository.findBy({
      status: statusEnum.publie,
    });
    return listProducts;
  }

  async getAllCategories() {
    const listCategories = await this.categoryRepository.find();
    return listCategories;
  }

  async countParentCategories(categoryId: string) {
    let parentCategoriesNumber = 0;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mongoose = require('mongoose');
    const idOfProduct = mongoose.Types.ObjectId(categoryId);
    let category = await this.categoryRepository.findOneBy({ _id: idOfProduct });

    while (category.parent_id != null) {
      parentCategoriesNumber++;
      const parent_id = this.mongoose.Types.ObjectId(category.parent_id);

      const categoryTemporary = await this.categoryRepository.findOneBy({
        _id: parent_id,
      });

      category = categoryTemporary;
    }
    return parentCategoriesNumber;
  }

  async getParentCategoryId(categoryId: string) {
    const category = await this.categoryRepository.findOneBy({
      _id: this.mongoose.Types.ObjectId(categoryId),
    });

    if (category.parent_id != null) {
      return category.parent_id;
    } else {
      return null;
    }
  }

  async getProductsWhereCategory(categoryId: string) {
    // eslint-disable-next-line prettier/prettier
    const listProducts = await this.productRepository.findBy({ category_id : categoryId });
    return listProducts;
  }

  async getLastPublishedProducts() {
    const listLastPublishedProducts = [];
    const listAllProducts = await this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    if(listAllProducts.length >= 10) {
      for (let i = 0; i < 10; i++) {
        if (listAllProducts[i] != null) {
          listLastPublishedProducts.push(listAllProducts[i]);
        }
      }
      return listLastPublishedProducts;
    } else {
      for (let i = 0; i < listAllProducts.length; i++) {
        if (listAllProducts[i] != null) {
          listLastPublishedProducts.push(listAllProducts[i]);
        }
      }
      return listLastPublishedProducts;
    }
  }

  async getRandomPublishedProducts() {
    const intRandomArray = await this.setIntRandomArray();
    const listExistingProducts = await this.getAllValidProducts();
    const listRandomPublishedProducts = [];

    for (let i = 0; i < intRandomArray.length; i++) {
      listRandomPublishedProducts.push(listExistingProducts[intRandomArray[i]]);
    }

    return listRandomPublishedProducts;
  }

  async getRecentVisitedProducts(categoryId: any) {
    if (categoryId == null) {
      return this.getLastPublishedProducts();
    } else {
      const parentCategoriesNumber = await this.countParentCategories(
        categoryId,
      );
      const listProductsResults = [];
      const listExistingProductsInCategories = [];

      for (let i = 0; i < parentCategoriesNumber; i++) {
        const temporaryList = await this.getProductsWhereCategory(categoryId);

        for (let i = 0; i < temporaryList.length; i++) {
          listExistingProductsInCategories.push(temporaryList[i]);
        }
        const nextParentCategory = await this.getParentCategoryId(categoryId);
        categoryId = nextParentCategory;
      }

      if (listExistingProductsInCategories.length < 10) {
        const randomList = await this.getRandomPublishedProducts();
        let i = 0;
        while (listExistingProductsInCategories.length < 10) {
          if (listExistingProductsInCategories.indexOf(randomList) === -1) {
            listExistingProductsInCategories.push(randomList[i]);
          }
          i++;
        }
        for (let ij = 0; ij < 10; ij++) {
          listProductsResults.push(listExistingProductsInCategories[ij]);
        }
        return listProductsResults;
      } else {
        for (let i = 0; i < 10; i++) {
          listProductsResults.push(listExistingProductsInCategories[i]);
        }
        return listProductsResults;
      }
    }
  }

  async getProductMedias(_id: any) {
    const productMedias = await this.productMediaRepository.findBy({
      product_id: _id,
    });
    return productMedias;
  }
}  

