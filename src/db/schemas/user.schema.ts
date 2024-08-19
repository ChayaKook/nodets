/**
 * The user interface describes the shape of a user document in the database.
 * It has three properties: username, email, and password, all of which are strings.
 */
import mongoose, { Document } from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
}

/**
 * The UserDocument interface extends the built-in Document interface and adds
 * the properties that are specific to a User document. The _id property is
 * automatically added by Mongoose and is a unique identifier for the document.
 */
export interface UserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
}

/**
 * We define a Mongoose schema for the User model using the UserSchema object.
 * The schema specifies the shape of the data that will be stored in the database.
 * In this case, we are specifying that the user document will have three properties:
 * username, email, and password, all of which are required and must be strings.
 */
// Define your mongoose schema and model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

/**
 * We then use the mongoose.model() method to create a model for the User document.
 * The first argument is the name of the model (in this case, 'User'), and the second
 * argument is the schema that we defined above.
 */
export const User = mongoose.model<UserDocument>('User', UserSchema);
