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
exports.ProductController = void 0;
const product_media_dto_1 = require("./../product_media/product_media.dto");
const product_dto_1 = require("./product.dto");
const product_service_1 = require("./product.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const status_enum_1 = require("./status_enum");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(createProduct, createProdMedia) {
        let response, statusAbonnement, messageDeRetour;
        try {
            response = await this.productService.create(createProduct, createProdMedia);
            statusAbonnement = true;
            messageDeRetour = 'Add product succes';
        }
        catch (error) {
            statusAbonnement = false;
            messageDeRetour = 'error,try again: ' + error.name;
        }
        return {
            data: response,
            status: statusAbonnement,
            message: messageDeRetour
        };
    }
    async createAndPublie(createProduct, createProdMedia, status) {
        let response, statusAbonnement, messageDeRetour;
        const myStatus = status.toUpperCase();
        common_1.Logger.log(myStatus);
        try {
            response = await this.productService.publicationProduct(createProduct, createProdMedia, myStatus);
            statusAbonnement = true;
            messageDeRetour = 'Add product succes and publish';
        }
        catch (error) {
            statusAbonnement = false;
            messageDeRetour = 'error,try again: ' + error.name;
        }
        return {
            data: response,
            status: statusAbonnement,
            message: messageDeRetour
        };
    }
    async updateProduct(id, productDto, createProdMedia) {
        let response, statusAbonnement, messageDeRetour;
        const mongoose = require('mongoose');
        const idOfProduct = mongoose.Types.ObjectId(id);
        try {
            response = await this.productService.update(id, productDto, createProdMedia);
            statusAbonnement = true;
            messageDeRetour = 'Update product succes';
        }
        catch (error) {
            statusAbonnement = false;
            messageDeRetour = 'update error,try again: ' + error.description;
        }
        return {
            data: response,
            status: statusAbonnement,
            message: messageDeRetour
        };
    }
    async updatePublishProduct(id, productDto, createProdMedia, status) {
        let response, statusAbonnement, messageDeRetour;
        const mongoose = require('mongoose');
        const idOfProduct = mongoose.Types.ObjectId(id);
        common_1.Logger.log(status);
        try {
            response = await this.productService.updatePublicationProduct(idOfProduct, productDto, createProdMedia, status);
            statusAbonnement = true;
            messageDeRetour = 'Update product succes';
        }
        catch (error) {
            statusAbonnement = false;
            messageDeRetour = 'update error,try again: ' + error.description;
        }
        return {
            data: response,
            status: statusAbonnement,
            message: messageDeRetour
        };
    }
    async getRecentlyVisitedProducts(categoryId) {
        try {
            const listProducts = await this.productService.getRecentVisitedProducts(categoryId);
            return {
                data: listProducts,
                status: true,
                message: 'All recent products visited list',
            };
        }
        catch (error) {
            return {
                data: null,
                status: false,
                message: 'An error occured while fetching products list',
            };
        }
    }
    async getProductMedias(product_id) {
        try {
            const productMedias = await this.productService.getProductMedias(product_id);
            return {
                data: productMedias,
                status: true,
                message: 'All medias for product :' + product_id,
            };
        }
        catch (error) {
            return {
                data: null,
                status: false,
                message: 'An error occured while fetching medias of product :' + product_id,
            };
        }
    }
    async getProductsThatCanInterest() {
        try {
            const listProducts = await this.productService.getRandomPublishedProducts();
            return {
                data: listProducts,
                status: true,
                message: 'All products that can interest',
            };
        }
        catch (error) {
            return {
                data: null,
                status: false,
                message: 'An error occured while fetching products list',
            };
        }
    }
    async getProductsOfTheMoment() {
        try {
            const listProducts = await this.productService.getLastPublishedProducts();
            return {
                data: listProducts,
                status: true,
                message: 'All products of the moment',
            };
        }
        catch (error) {
            return {
                data: null,
                status: false,
                message: 'An error occured while fetching products list',
            };
        }
    }
};
__decorate([
    (0, common_1.Post)('/save'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Add product succes',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Product cannot registre' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, product_media_dto_1.ProductMediaDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)('save/publier/:status'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'publication succes',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Product cannot publish' }),
    __param(0, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, product_media_dto_1.ProductMediaDto, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createAndPublie", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Update product succes',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Product cannot Update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID, product_dto_1.ProductDto, product_media_dto_1.ProductMediaDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Patch)('update/publish/:id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Update product succes',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Product cannot Update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(3, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID, product_dto_1.ProductDto, product_media_dto_1.ProductMediaDto, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updatePublishProduct", null);
__decorate([
    (0, common_1.Get)('/recent_products_visited/:category_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all recently visited products' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All recently visited products',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __param(0, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getRecentlyVisitedProducts", null);
__decorate([
    (0, common_1.Get)('/product_medias/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'This is the product id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All categories',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductMedias", null);
__decorate([
    (0, common_1.Get)('/can_interest'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products that can interest' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All products that can interest',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsThatCanInterest", null);
__decorate([
    (0, common_1.Get)('/products_of_the_moment'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products of the moment' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All products of the moment',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsOfTheMoment", null);
ProductController = __decorate([
    (0, swagger_1.ApiHeader)({
        name: 'Produit',
        description: 'Api pour ajouter et modifier les produits',
    }),
    (0, swagger_1.ApiTags)('Product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map