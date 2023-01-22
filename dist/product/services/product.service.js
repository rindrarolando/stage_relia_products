"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../category/models/category.entity");
const typeorm_2 = require("typeorm");
const statusEnum_1 = require("../enums/statusEnum");
const product_entity_1 = require("../models/product.entity");
const productmedia_entity_1 = require("../models/productmedia.entity");
let ProductService = class ProductService {
    constructor(productRepository, productMediaRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.productMediaRepository = productMediaRepository;
        this.categoryRepository = categoryRepository;
        this.mongoose = require('mongoose');
    }
    async setIntRandomArray() {
        const documentsProductsNumber = await this.productRepository.count();
        const productsNumber = documentsProductsNumber - 1;
        const intRandomArray = [];
        if (documentsProductsNumber >= 10) {
            while (intRandomArray.length < 10) {
                const intRandomTemporary = Math.floor(Math.random() * productsNumber) + 1;
                if (intRandomArray.indexOf(intRandomTemporary) === -1)
                    intRandomArray.push(intRandomTemporary);
            }
            return intRandomArray;
        }
        else {
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
            status: statusEnum_1.StatusEnum.publie,
        });
        return listProducts;
    }
    async getAllCategories() {
        const listCategories = await this.categoryRepository.find();
        return listCategories;
    }
    async countParentCategories(categoryId) {
        let parentCategoriesNumber = 0;
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
    async getParentCategoryId(categoryId) {
        const category = await this.categoryRepository.findOneBy({
            _id: this.mongoose.Types.ObjectId(categoryId),
        });
        if (category.parent_id != null) {
            return category.parent_id;
        }
        else {
            return null;
        }
    }
    async getProductsWhereCategory(categoryId) {
        const listProducts = await this.productRepository.findBy({ category_id: categoryId });
        return listProducts;
    }
    async getLastPublishedProducts() {
        const listLastPublishedProducts = [];
        const listAllProducts = await this.productRepository.find({
            order: {
                created_at: 'DESC',
            },
        });
        if (listAllProducts.length >= 10) {
            for (let i = 0; i < 10; i++) {
                if (listAllProducts[i] != null) {
                    listLastPublishedProducts.push(listAllProducts[i]);
                }
            }
            return listLastPublishedProducts;
        }
        else {
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
    async getRecentVisitedProducts(categoryId) {
        if (categoryId == null) {
            return this.getLastPublishedProducts();
        }
        else {
            const parentCategoriesNumber = await this.countParentCategories(categoryId);
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
            }
            else {
                for (let i = 0; i < 10; i++) {
                    listProductsResults.push(listExistingProductsInCategories[i]);
                }
                return listProductsResults;
            }
        }
    }
    async getProductMedias(_id) {
        const productMedias = await this.productMediaRepository.findBy({
            product_id: _id,
        });
        return productMedias;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(productmedia_entity_1.ProductMediaEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map