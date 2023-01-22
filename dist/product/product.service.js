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
const status_enum_1 = require("./status_enum");
const common_1 = require("@nestjs/common");
const type_media_1 = require("../product_media/type_media");
const product_media_1 = require("./../product_media/product_media");
const product_media_dto_1 = require("./../product_media/product_media.dto");
const product_1 = require("./product");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_dto_1 = require("./product.dto");
;
const swagger_1 = require("@nestjs/swagger");
const category_entity_1 = require("../category/models/category.entity");
let ProductService = class ProductService {
    constructor(productRepository, productMediaRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.productMediaRepository = productMediaRepository;
        this.categoryRepository = categoryRepository;
        this.mongoose = require('mongoose');
    }
    async create(product, productMedia) {
        const response = [];
        const mongoose = require('mongoose');
        product.status = status_enum_1.statusEnum.nouveau;
        common_1.Logger.log(typeof product.status);
        const responseProduct = await this.productRepository.save(product);
        response.push(responseProduct);
        const idOfProduct = mongoose.Types.ObjectId((responseProduct)._id);
        productMedia = {
            product_id: idOfProduct,
            media: [{
                    _id: idOfProduct,
                    type: type_media_1.typeMedia.image,
                    media_id: '3az2ezs3e5r1de45qs'
                },
                {
                    _id: idOfProduct,
                    type: type_media_1.typeMedia.video,
                    media_id: '8az2ezs3e5r1de4l68'
                }
            ]
        };
        const responseProductMedia = await this.productMediaRepository.save(productMedia);
        response.push(responseProductMedia);
        for (let i = 0; i < response.length; i++) {
            return response[i];
        }
    }
    async getIdProductMedia(id) {
        const mongoose = require('mongoose');
        const idOfProduct = mongoose.Types.ObjectId(id);
        const response = await this.productMediaRepository.findOneBy({ product_id: idOfProduct });
        return response._id;
    }
    async update(id, product, productMedia) {
        const response = [];
        const mongoose = require('mongoose');
        const idOfProduct = mongoose.Types.ObjectId(id);
        const newProduct = await this.productRepository.preload(Object.assign({ _id: idOfProduct }, product));
        const responseProduct = await this.productRepository.save(newProduct);
        response.push(responseProduct);
        productMedia = {
            product_id: idOfProduct,
            media: [{
                    _id: idOfProduct,
                    type: type_media_1.typeMedia.video,
                    media_id: '3az2ezs3e5r1de45qs'
                },
                {
                    _id: idOfProduct,
                    type: type_media_1.typeMedia.image,
                    media_id: '8az2ezs3e5r1de4l68mety'
                }
            ]
        };
        const idProductMedia = mongoose.Types.ObjectId((await this.getIdProductMedia(id)).toString());
        const newProductMedia = await this.productMediaRepository.preload(Object.assign({ _id: idProductMedia }, productMedia));
        const responseProductMedia = await this.productMediaRepository.save(newProductMedia);
        response.push(responseProductMedia);
        return responseProduct;
    }
    async updateStatus(id, product, status) {
        const mongoose = require('mongoose');
        const idOfProduct = mongoose.Types.ObjectId(id);
        product.status = status;
        const newProduct = await this.productRepository.preload(Object.assign({ _id: idOfProduct }, product));
        const responseProduct = await this.productRepository.save(newProduct);
        return responseProduct;
    }
    async publicationProduct(product, productMedia, status) {
        const myProduct = this.create(product, productMedia);
        const mongoose = require('mongoose');
        const idOfProduct = mongoose.Types.ObjectId((await myProduct)._id);
        let updateProduct;
        if (status == status_enum_1.statusEnum.publie)
            updateProduct = await this.updateStatus(idOfProduct, product, status);
        return updateProduct;
    }
    async updatePublicationProduct(id, product, productMedia, status) {
        const mongoose = require('mongoose');
        const idOfProduct = mongoose.Types.ObjectId(id);
        const myStatus = status.toUpperCase();
        let updateProduct;
        common_1.Logger.log(myStatus);
        if (myStatus == status_enum_1.statusEnum.publie)
            updateProduct = await this.updateStatus(idOfProduct, product, myStatus);
        else
            updateProduct = await this.updateStatus(idOfProduct, product, myStatus);
        return updateProduct;
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
            status: status_enum_1.statusEnum.publie,
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
                createdAt: 'DESC',
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
__decorate([
    (0, swagger_1.ApiQuery)({ name: 'type', enum: type_media_1.typeMedia }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, product_media_dto_1.ProductMediaDto]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "create", null);
ProductService = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(product_media_1.ProductMedia)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map