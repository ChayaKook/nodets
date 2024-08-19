import mongoose from "mongoose";

/**
 * The product interface describes the shape of a product document in the database.
 * It has four properties: name, description, price, and category, all of which are strings.
 */
export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

/**
 * The ProductDocument interface extends the built-in Document interface and adds
 * the properties that are specific to a Product document.
 */
export interface ProductDocument extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

/**
 * We define a Mongoose schema for the Product model using the ProductSchema object.
 * The schema specifies the shape of the data that will be stored in the database.
 * In this case, we are specifying that the product document will have four properties:
 * name, description, price, and category, all of which are required.
 */
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }
});

export const Product = mongoose.model<ProductDocument>('Product', ProductSchema);