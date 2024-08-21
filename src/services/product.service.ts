// Product.service.ts

import { Product, ProductDocument } from '../db/schemas/product.schema';
import mongoose, { Types } from 'mongoose';

class ProductService {
    public async getProductById(ProductId: string): Promise<Product | any> {
        try {
            const objectId = new Types.ObjectId(ProductId);
            const product = await Product.findById(objectId);
            if (!Product) {
                throw new Error(`Product not found with ID ${ProductId}`);
            }
            return Product;
        } catch (error) {
            throw error;
        }
    }

    public async getProducts(): Promise<Product[]> {
        try {
            const Products = await Product.find();
            if (!Products) {
                throw new Error(`Products not found`);
            }
            return Products;
        } catch (error) {
            throw error;
        }
    }

    public async createProduct(product: Product): Promise<Product> {
        try {
            const newProduct = await Product.create(product);
            if (!Product) {
                throw new Error(`Product faild to created`);
            }
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    public async updateProduct(productId:string, product: Product): Promise<Product|any> {
        try {
            const newProduct = await Product.findByIdAndUpdate(productId, product, { new: true });
            return newProduct;
         } catch (error) {
             throw error
         }
    }

    public async deleteProduct(ProductId: string): Promise<void> {
        try {
           Product.findOneAndDelete({ _id: ProductId });
        } catch (error) {
            throw error
        }
    }
}

export default ProductService;
