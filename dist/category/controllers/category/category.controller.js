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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("../../services/category/category.service");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async findall() {
        try {
            const listOfAllCategories = await this.categoryService.getAllCategories();
            return {
                data: listOfAllCategories,
                status: true,
                message: 'All categories list',
            };
        }
        catch (error) {
            return {
                data: null,
                status: true,
                message: 'An error occured',
            };
        }
    }
    async getTopCategories() {
        try {
            const listTopCategories = await this.categoryService.getTopCategories();
            return {
                data: listTopCategories,
                status: true,
                message: 'All top categories list',
            };
        }
        catch (error) {
            return {
                data: null,
                status: false,
                message: 'An error occured',
            };
        }
    }
    async getAllSubcategories(parentId) {
        const categoryName = await this.categoryService.getCategoryDescriptionById(parentId);
        try {
            const listSubcategories = await this.categoryService.getAllSubcategories(parentId);
            return {
                data: listSubcategories,
                status: true,
                message: 'All subcategories list of ' + categoryName,
            };
        }
        catch (error) {
            return {
                data: null,
                status: false,
                message: 'An error occured while fetching subcategories of ' + categoryName,
            };
        }
    }
};
__decorate([
    (0, common_1.Get)('/all_categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)('/top_categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the top categories, Or Random of 10 ' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All Top categories',
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
], CategoryController.prototype, "getTopCategories", null);
__decorate([
    (0, common_1.Get)('/all_subcategories/:parent_id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the subcategories of a category or of a subcategory',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All subcategories of a category or of a subcategory',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __param(0, (0, common_1.Param)('parent_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllSubcategories", null);
CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Categories Module'),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map