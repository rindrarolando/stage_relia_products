/* eslint-disable prettier/prettier */
import { ObjectID } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/models/category.entity';
import { Repository } from 'typeorm';
import { StatusEnum } from '../enums/statusEnum';
import { ProductEntity } from '../models/product.entity';
import { ProductMediaEntity } from '../models/productmedia.entity';

@Injectable()
export class ProductService {
  mongoose = require('mongoose');
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductMediaEntity)
    private readonly productMediaRepository: Repository<ProductMediaEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

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
      status: StatusEnum.publie,
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
        created_at: 'DESC',
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
