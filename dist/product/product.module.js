"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const product_media_service_1 = require("./../product_media/product_media.service");
const product_media_controller_1 = require("./../product_media/product_media.controller");
const product_media_1 = require("./../product_media/product_media");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_1 = require("./product");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const product_entity_1 = require("./models/product.entity");
const productmedia_entity_1 = require("./models/productmedia.entity");
const category_entity_1 = require("../category/models/category.entity");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_1.Product, product_media_1.ProductMedia, product_entity_1.ProductEntity, productmedia_entity_1.ProductMediaEntity, category_entity_1.CategoryEntity])],
        controllers: [product_controller_1.ProductController, product_media_controller_1.ProductMediaController, product_controller_1.ProductController],
        providers: [product_service_1.ProductService, product_media_service_1.ProductMediaService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map