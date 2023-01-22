import { CategoryEntity } from 'src/category/models/category.entity';
import { Repository } from 'typeorm';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    getAllCategories(): Promise<CategoryEntity[]>;
    setIntRandomArray(): Promise<any[]>;
    getTopCategories(): Promise<any[]>;
    getCategoryDescriptionById(id: any): Promise<string>;
    getAllSubcategories(parentId: any): Promise<CategoryEntity[]>;
}
