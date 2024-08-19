// user.service.ts

import { User, UserDocument } from '../db/schemas/user.schema';
import mongoose, { Types } from 'mongoose';

class UserService {
    public async getUserById(userId: string): Promise<User | any> {
        try {
            const objectId = new Types.ObjectId(userId); // Convert the string to ObjectId
            const user = await User.findById(objectId);
            if (!user) {
                throw new Error(`User not found with ID ${userId}`);
            }
            return user;
        } catch (error) {
            console.log("service - getByIdUser");

            console.log(error);

            // throw error;
        }
    }

    public async getUsers(): Promise<User[]> {
        try {
            const users = await User.find();
            if (!users) {
                throw new Error(`Users not found`);
            }
            return users;
        } catch (error) {
            console.log("getUsers");
            console.log(error);

            throw error;
        }
    }

    public async createUser(user: User): Promise<User> {
        try {
            const newUser = await User.create(user);
            if (!user) {
                throw new Error(`User faild to created`);
            }
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(user: User): Promise<User> {
        throw new Error("---");
        // Implement logic to update an existing user in the database
    }

    public async deleteUser(userId: string): Promise<void> {
        throw new Error("---");
        // Implement logic to delete a user from the database
    }
}

export default UserService;
