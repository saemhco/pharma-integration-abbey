import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApikeyDTO, UpdateApikeyDTO } from './dtos/api-key.dto';
import { ApiKey } from './interfaces/pharmacy.interface';

@Injectable()
export class AuthService {
    constructor(@InjectModel('intregration_api_key') private readonly model: Model<ApiKey>) { }

    // Get all data
    async getAll(filters): Promise<ApiKey[]> {
        let filtersObject = {};
        if (filters) {
            const data = filters.split('|');
            data.forEach((item) => {
                const filter = item.split('=');
                filtersObject[filter[0]] = filter[1];
            });
        }
        const data = await this.model.find(filtersObject).sort({ createdAt: -1 });
        return data;
    }
    
    // Get a single data
    async getOne(ID: string): Promise<ApiKey> {
        const data = await this.model.findById(ID);
        return data;
    }

      // Post a single 
    async create(createDTO: CreateApikeyDTO): Promise<ApiKey> {
        const request = createDTO;
        // user is unique
        const exist = await this.model.findOne(createDTO);
        console.log("exist",exist);
        if (exist) {
            throw new BadRequestException(`${createDTO.user} and ${createDTO.type} already exist`);
        }
        //generate api key
        request["apiKey"] = await this.generateApiKey();
        const data = new this.model(request);
        return data.save();
    }

    async generateApiKey() {
        //generate api key 
        const apiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).toUpperCase() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 30);
        // verify if api key is unique
        const exist = await this.model.findOne({ apiKey }); 
        if (exist) {
            return this.generateApiKey();
        }
        return apiKey;
    }

    // Delete 
    async delete(ID: any): Promise<any> {
        const data = await this.model.findByIdAndDelete(ID);
        return data;
    }

    // Put a single 
    async update(ID: string, payload: UpdateApikeyDTO): Promise<ApiKey> {
        const data = await this.model.findByIdAndUpdate(ID, payload, { new: true });
        return data;
    }    
}
