import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customerFormatField } from 'src/common/helpers/customer.helper';
import { formatDate } from 'src/common/helpers/date-time.helper';
import { CreateCustomerDTO, UpdateCustomerDTO } from './dtos/customer.dto';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {

    constructor(@InjectModel('customers') private readonly model: Model<Customer>) { }

    // Get all data
    async getAll(filters): Promise<Customer[]> {
        let filtersObject = {};
        if (filters) {
            const data = filters.split('|');
            data.forEach((item) => {
                const filter = item.split('=');
                filtersObject[filter[0]] = filter[1];
            });
        }
        const data = await this.model.find(filtersObject).sort({ createdAt: -1 });
        const dataV2 = data.map((item,index) => {
            return customerFormatField(item);
       });
        return dataV2;
    }
    
    // Get a single data
    async getOne(ID: string): Promise<Customer> {
        const data = await this.model.findById(ID);
        return customerFormatField(data);
    }

      // Post a single 
    async create(payload: CreateCustomerDTO): Promise<Customer> {
        const data = new this.model(payload);
        const dataV2 = await data.save();
        
        return customerFormatField(dataV2);
    }

    // Delete 
    async delete(ID: any): Promise<any> {
        const data = await this.model.findByIdAndDelete(ID);
        return customerFormatField(data);
    }

    // Put a single 
    async update(ID: string, payload: UpdateCustomerDTO): Promise<Customer> {
        const data = await this.model.findByIdAndUpdate(ID, payload, { new: true });
        return customerFormatField(data);
    }
}
