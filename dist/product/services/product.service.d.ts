import { CategoryEntity } from 'src/category/models/category.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../models/product.entity';
import { ProductMediaEntity } from '../models/productmedia.entity';
export declare class ProductService {
    private readonly productRepository;
    private readonly productMediaRepository;
    private readonly categoryRepository;
    mongoose: any;
    constructor(productRepository: Repository<ProductEntity>, productMediaRepository: Repository<ProductMediaEntity>, categoryRepository: Repository<CategoryEntity>);
    setIntRandomArray(): Promise<any[]>;
    getAllValidProducts(): Promise<ProductEntity[]>;
    getAllCategories(): Promise<CategoryEntity[]>;
    countParentCategories(categoryId: string): Promise<number>;
    getParentCategoryId(categoryId: string): Promise<string>;
    getProductsWhereCategory(categoryId: string): Promise<ProductEntity[]>;
    getLastPublishedProducts(): Promise<any[]>;
    getRandomPublishedProducts(): Promise<any[]>;
    getRecentVisitedProducts(categoryId: any): Promise<any[]>;
    getProductMedias(_id: any): Promise<ProductMediaEntity[]>;
}
