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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("../services/product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
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
    async getNumberOfParentCategories() {
        const listCategories = await this.productService.getAllCategories();
        const number = await this.productService.getRecentVisitedProducts(null);
        return number;
    }
};
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
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getNumberOfParentCategories", null);
ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products module'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map