import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { formatDate } from 'src/common/helpers/date-time.helper';
import { getCustomerPopulateObject, getPharmacyPopulateObject } from 'src/common/helpers/prescription.helper';
import { Prescription, PrescriptionDocument } from 'src/schemas/prescription.schema';
import { CreatePrescriptionDTO, UpdatePrescriptionDTO, UploadFileDTO } from './dtos/prescription.dto';
import {SoftDeleteModel} from "soft-delete-plugin-mongoose";

@Injectable()
export class PrescriptionService {
    constructor(@InjectModel(Prescription.name) private model: SoftDeleteModel<PrescriptionDocument>) { }

    // Get all data
    async getAll(filters): Promise<Prescription[]> {
        let filtersObject = {};
        if (filters) {
            const data = filters.split('|');
            data.forEach((item) => {
                const filter = item.split('=');
                filtersObject[filter[0]] = filter[1];
            });
        }
        const data = await this.model.find(filtersObject).sort({ createdAt: -1 })
        .populate(getCustomerPopulateObject())
        .populate(getPharmacyPopulateObject());
    
        const dataV2 = data.map((item,index) => {
            const newData =  {...item} as any;
            newData._doc.createdAt =   formatDate(item.createdAt);
            return newData._doc as Prescription;
       });
        return dataV2;
    }
    
    // Get a single data
    async getOne(ID: string): Promise<Prescription> {
        const data = await this.model.findById(ID)
        .populate(getCustomerPopulateObject())
        .populate(getPharmacyPopulateObject());
        return data;
    }


      // Post a single 
    async create(createDTO: CreatePrescriptionDTO): Promise<Prescription> {
        const data = new this.model(createDTO);
        return data.save();
    }

    // Delete 
    async delete(ID: any): Promise<any> {
        const filter  = { _id: ID };
        const deleted = await this.model.softDelete(filter);
        return deleted;
    }

    // Put a single 
    async update(ID: string, payload: UpdatePrescriptionDTO): Promise<Prescription> {
        const data = await this.model.findByIdAndUpdate(ID, payload, { new: true })
        .populate(getCustomerPopulateObject())
        .populate(getPharmacyPopulateObject());
        return data;
    }
    // update only file
    async uploadFile(ID: string, payload: UploadFileDTO): Promise<Prescription> {
        if(!payload.img_url){
            throw new BadRequestException('Image is required');
        }
        const data = await this.model.findByIdAndUpdate(ID, payload, { new: true });
        return data;
    }
}
