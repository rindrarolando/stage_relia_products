import { ProductMediaDto } from './../product_media/product_media.dto';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { ObjectID } from 'typeorm';
import { statusEnum } from './status_enum';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(createProduct: ProductDto, createProdMedia: ProductMediaDto): Promise<{
        data: object;
        status: boolean;
        message: string;
    }>;
    createAndPublie(createProduct: ProductDto, createProdMedia: ProductMediaDto, status: statusEnum): Promise<{
        data: object;
        status: boolean;
        message: string;
    }>;
    updateProduct(id: ObjectID, productDto: ProductDto, createProdMedia: ProductMediaDto): Promise<{
        data: object;
        status: boolean;
        message: string;
    }>;
    updatePublishProduct(id: ObjectID, productDto: ProductDto, createProdMedia: ProductMediaDto, status: string): Promise<{
        data: object;
        status: boolean;
        message: string;
    }>;
    getRecentlyVisitedProducts(categoryId: string): Promise<{
        data: any[];
        status: boolean;
        message: string;
    }>;
    getProductMedias(product_id: string): Promise<{
        data: import("../product_media/product_media").ProductMedia[];
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
}
