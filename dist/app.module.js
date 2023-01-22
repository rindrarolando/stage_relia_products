"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const category_entity_1 = require("./category/models/category.entity");
const product_media_1 = require("./product_media/product_media");
const product_module_1 = require("./product/product.module");
const product_1 = require("./product/product");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_media_module_1 = require("./product_media/product_media.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const category_module_1 = require("./category/category.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                host: '127.0.0.1',
                port: 27017,
                username: 'test',
                password: '',
                database: 'service_product',
                entities: [product_1.Product, product_media_1.ProductMedia, category_entity_1.CategoryEntity, 'dist/**/**/.entity{.ts, .js}'],
                useNewUrlParser: true,
                autoLoadEntities: true,
                useUnifiedTopology: true,
                synchronize: true,
            }),
            product_module_1.ProductModule,
            product_media_module_1.ProductMediaModule,
            category_module_1.CategoryModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map