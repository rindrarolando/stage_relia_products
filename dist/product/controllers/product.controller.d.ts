import { ProductService } from '../services/product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getRecentlyVisitedProducts(categoryId: string): Promise<{
        data: any[];
        status: boolean;
        message: string;
    }>;
    getProductMedias(product_id: string): Promise<{
        data: import("../models/productmedia.entity").ProductMediaEntity[];
        status: boolean;
        message: string;
    }>;
    getProductsThatCanInterest(): Promise<{
        data: any[];
        status: boolean;
        message: string;
    }>;
    getProductsOfTheMoment(): Promise<{
        data: any[];
        status: boolean;
        message: string;
    }>;
    getNumberOfParentCategories(): Promise<any[]>;
}
