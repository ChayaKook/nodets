import mongoose from "mongoose";

/**
 * The order interface describes the shape of an order document in the database.
 * It has five properties: userId, products, total, status, and date, all of which are strings or numbers.
 */
export interface Order {
    _id?: string;
    userId: string;
    products: string[];
    totalSum: number;
    status: string;
    date: Date;
  }
  
  /**
   * The OrderDocument interface extends the built-in Document interface and adds
   * the properties that are specific to an Order document.
   */
  export interface OrderDocument extends Document {
    _id?: string;
    userId: string;
    products: string[];
    totalSum: number;
    status: string;
    date: Date;
  }
  
  /**
   * We define a Mongoose schema for the Order model using the OrderSchema object.
   * The schema specifies the shape of the data that will be stored in the database.
   * In this case, we are specifying that the order document will have five properties:
   * userId, products, total, status, and date, all of which are required.
   */
  const OrderSchema = new mongoose.Schema({
    products: { type: [{ type: String, ref: 'Product' }], required: true },
    totalSum: { type: Number, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true }
  });
  
  export const Order = mongoose.model<OrderDocument>('Order', OrderSchema);