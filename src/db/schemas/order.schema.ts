import { Product } from "./product.schema";

export interface Order{
    _id:string;
    time:Date;
    userId:string;
    notice:string;
    title:Product;
    count:number;//of products
    duration:number;//of service
}