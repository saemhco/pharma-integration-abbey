import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeySchema } from 'src/auth/schemas/apikey.schema';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { PharmacySchema } from '../schemas/pharmacy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: PharmacySchema },
      { name: 'intregration_api_key', schema: ApiKeySchema }
    ])],
  controllers: [PharmacyController],
  providers: [PharmacyService]
})
export class PharmacyModule {}
