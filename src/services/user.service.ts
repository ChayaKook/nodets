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
            throw error;
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
            throw error;
        }
    }

    public async createUser(user: User): Promise<User> {
        try {
            const isOccupied = await User.findOne({email:user.email})
            
            if(isOccupied) {
                throw new Error(`Email already in use`);
            }
            const newUser = await User.create(user);
            if (!user) {
                throw new Error(`User faild to created`);
            }
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(userId:string, user: User): Promise<User|any> {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
            return updatedUser;
         } catch (error) {
             throw error
         }
    }

    public async deleteUser(userId: string): Promise<User|any> {
        try {
           return User.findOneAndDelete({ _id: userId });
        } catch (error) {
            throw error
        }
    }
}

export default UserService;
