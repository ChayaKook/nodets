import { User } from "../schemas/user.schema";

interface BusinessDTO{
    
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
