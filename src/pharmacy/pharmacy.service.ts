import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { pharmacyFormatField } from 'src/common/helpers/pharmacy.helper';
import { PharmacyDocument, Pharmacy } from 'src/schemas/pharmacy.schema';
import { CreatePharmacyDTO, UpdatePharmacyDTO } from './dtos/pharmacy.dto';
import { Pharmacy as PharmacyInteface } from "src/pharmacy/interfaces/pharmacy.interface";

@Injectable()
export class PharmacyService { 
    constructor(
        @InjectModel('users') private readonly model: SoftDeleteModel<PharmacyDocument>,
        @InjectModel('users') private readonly modelAll: Model<PharmacyInteface>
        
        ) { }

    // Get all data
    async getAll(filters): Promise<PharmacyInteface[]> {
        let filtersObject = {};
        if (filters) {
            const data = filters.split('|');
            data.forEach((item) => {
                const filter = item.split('=');
                filtersObject[filter[0]] = filter[1];
            });
        }
        const data = await this.modelAll.find().exec(); //.sort({ createdAt: -1 });
        console.log(data);
        const dataV2 = data.map((item) => {
            return pharmacyFormatField(item);
       });
        return dataV2;
    }
    
    // Get a single data
    async getOne(ID: string): Promise<PharmacyInteface> {
        const data = await this.model.findById(ID);
        return pharmacyFormatField(data);
    }

      // Post a single 
    async create(createDTO: CreatePharmacyDTO): Promise<PharmacyInteface> {
        const data = new this.model(createDTO);
        const dataV2 = await data.save();
        return pharmacyFormatField(dataV2);
    }

    // Delete 
    async delete(ID: any): Promise<any> {
        const data0 = await this.model.findById(ID);
        if(data0 && !data0.is_integration){
            throw new UnauthorizedException('You don\'t have permission to delete this pharmacy');
        }
        const data = await this.model.findByIdAndDelete(ID);
        return pharmacyFormatField(data);
    }

    // Put a single 
    async update(ID: string, payload: UpdatePharmacyDTO): Promise<PharmacyInteface> {
        const data = await this.model.findByIdAndUpdate(ID, payload, { new: true });
        return pharmacyFormatField(data);
    }
}
