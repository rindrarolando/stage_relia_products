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
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const statusEnum_1 = require("../enums/statusEnum");
const timestampEntity_1 = require("../utils/timestampEntity");
let ProductEntity = class ProductEntity extends timestampEntity_1.TimestampEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], ProductEntity.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)('category_id'),
    __metadata("design:type", String)
], ProductEntity.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)('name'),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('long_description'),
    __metadata("design:type", String)
], ProductEntity.prototype, "long_description", void 0);
__decorate([
    (0, typeorm_1.Column)('short_description'),
    __metadata("design:type", String)
], ProductEntity.prototype, "short_description", void 0);
__decorate([
    (0, typeorm_1.Column)('general_price'),
    __metadata("design:type", Number)
], ProductEntity.prototype, "general_price", void 0);
__decorate([
    (0, typeorm_1.Column)('unit_measure_id'),
    __metadata("design:type", String)
], ProductEntity.prototype, "unit_measure_id", void 0);
__decorate([
    (0, typeorm_1.Column)('quantity'),
    __metadata("design:type", Number)
], ProductEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('after_sales_service'),
    __metadata("design:type", String)
], ProductEntity.prototype, "after_sales_service", void 0);
__decorate([
    (0, typeorm_1.Column)('owner_id'),
    __metadata("design:type", String)
], ProductEntity.prototype, "owner_id", void 0);
__decorate([
    (0, typeorm_1.Column)('status'),
    __metadata("design:type", String)
], ProductEntity.prototype, "status", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)('products')
], ProductEntity);
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map