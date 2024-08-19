import { User } from "./user.schema";

export interface Business{
    
    _id: string;
    name: string
    phone: string;
    address:string;
    admin: {
        _id: string;
        adminKey: string;
        user: User;
    }
}
