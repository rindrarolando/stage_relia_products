import { CategoryService } from 'src/category/services/category/category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findall(): Promise<{
        data: import("../../models/category.entity").CategoryEntity[];
        status: boolean;
        message: string;
    }>;
    getTopCategories(): Promise<{
        data: any[];
        status: boolean;
        message: string;
    }>;
    getAllSubcategories(parentId: string): Promise<{
        data: import("../../models/category.entity").CategoryEntity[];
        status: boolean;
        message: string;
    }>;
}
