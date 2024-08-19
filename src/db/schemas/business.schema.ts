import mongoose from "mongoose";
import { User } from "./user.schema";

/**
 * The Business interface describes the shape of a business document in the database.
 * It has five properties: _id, name, phone, address, and admin, all of which are strings or objects.
 */
export interface Business {
  _id: string;
  name: string;
  phone: string;
  address: string;
  admin: User
}

/**
 * The BusinessDocument interface extends the built-in Document interface and adds
 * the properties that are specific to a Business document.
 */
export interface BusinessDocument extends Document {
  _id: string;
  name: string;
  phone: string;
  address: string;
  admin: User
}

/**
 * We define a Mongoose schema for the Business model using the BusinessSchema object.
 * The schema specifies the shape of the data that will be stored in the database.
 * In this case, we are specifying that the business document will have five properties:
 * _id, name, phone, address, and admin, all of which are required.
 */
const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Business = mongoose.model<BusinessDocument>('Business', BusinessSchema);