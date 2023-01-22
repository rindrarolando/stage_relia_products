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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const timestamp_entity_1 = require("./../generics/timestamp_entity");
const status_enum_1 = require("./status_enum");
let Product = class Product extends timestamp_entity_1.timeStampEntity {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], Product.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)('category_id'),
    __metadata("design:type", String)
], Product.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)('name'),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('long_description'),
    __metadata("design:type", String)
], Product.prototype, "long_description", void 0);
__decorate([
    (0, typeorm_1.Column)('short_description'),
    __metadata("design:type", String)
], Product.prototype, "short_description", void 0);
__decorate([
    (0, typeorm_1.Column)('general_price'),
    __metadata("design:type", Number)
], Product.prototype, "general_price", void 0);
__decorate([
    (0, typeorm_1.Column)('unit_measure_id'),
    __metadata("design:type", String)
], Product.prototype, "unit_measure_id", void 0);
__decorate([
    (0, typeorm_1.Column)('quantity'),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('after_sales_service'),
    __metadata("design:type", String)
], Product.prototype, "after_sales_service", void 0);
__decorate([
    (0, typeorm_1.Column)('owner_id'),
    __metadata("design:type", String)
], Product.prototype, "owner_id", void 0);
__decorate([
    (0, typeorm_1.Column)('status'),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)('product')
], Product);
exports.Product = Product;
//# sourceMappingURL=product.js.map