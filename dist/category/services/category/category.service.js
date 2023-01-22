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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../models/category.entity");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getAllCategories() {
        const response = await this.categoryRepository.find();
        return response;
    }
    async setIntRandomArray() {
        const DocumentsCategoriesNumber = this.categoryRepository.count();
        const categoriesNumber = (await DocumentsCategoriesNumber) - 1;
        const intRandomArray = [];
        while (intRandomArray.length < 10) {
            const intRandomTemporary = Math.floor(Math.random() * (await categoriesNumber)) + 1;
            if (intRandomArray.indexOf(intRandomTemporary) === -1)
                intRandomArray.push(intRandomTemporary);
        }
        return intRandomArray;
    }
    async getTopCategories() {
        const intRandomArray = await this.setIntRandomArray();
        const listExistingCategories = await this.getAllCategories();
        const listTopCategories = [];
        if (listExistingCategories.length >= 10) {
            for (let i = 0; i < intRandomArray.length; i++) {
                listTopCategories.push(listExistingCategories[intRandomArray[i]]);
            }
            return listTopCategories;
        }
        else {
            return listExistingCategories;
        }
    }
    async getCategoryDescriptionById(id) {
        const category = await this.categoryRepository.findOneByOrFail({ _id: id });
        const categoryDescription = category.name;
        return categoryDescription;
    }
    getAllSubcategories(parentId) {
        const listSubcategories = this.categoryRepository.findBy({
            parent_id: parentId,
        });
        return listSubcategories;
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map