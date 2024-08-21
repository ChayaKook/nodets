// business.service.ts

import { Business } from '../db/schemas/business.schema';

class BusinessService {

    public async getBusiness(): Promise<Business|any> {
        try {
            const business = await Business.findOne();
            if (!business) {
                throw new Error(`business not found`);
            }
            return business;
        } catch (error) {
            throw error;
        }
    }

    public async createBusiness(business: Business): Promise<Business> {
        try {
            const newBusiness = await Business.create(business);
            if (!business) {
                throw new Error(`business faild to created`);
            }
            return newBusiness;
        } catch (error) {
            throw error;
        }
    }

    public async updateBusiness(businessId: string, business: Business): Promise<Business|any> {
        try {
            const businessToUpdate = {
                name:business.name,
                phone:business.phone,
                address:business.address,
                admin:business.admin
            }
            
            return await Business.findByIdAndUpdate(businessId, businessToUpdate, { new: true });
        } catch (error) {
            throw error;
        }
    }

    public async deleteBusiness(businessId: string): Promise<Business|any> {
        try {
           const business = await Business.findOneAndDelete({ _id: businessId });
           return business;
        } catch (error) {
            throw error
        }
    }
}

export default BusinessService;
