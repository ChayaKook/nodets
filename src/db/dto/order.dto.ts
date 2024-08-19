import { Product } from "../schemas/product.schema";

interface OrderDTO{
    _id:string;
    time:Date;
    userId:string;
    notice:string;
    title:Product;
    count:number;//of products
    duration:number;//of service
}