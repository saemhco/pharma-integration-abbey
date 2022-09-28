import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeySchema } from 'src/auth/schemas/apikey.schema';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionService } from './prescriptions.service';
import { Prescription, PrescriptionSchema } from '../schemas/prescription.schema';
import { UploadFileS3Service } from './upload-file-s3.service';

@Module({
  imports: [MongooseModule.forFeature(
    [
      { name: Prescription.name, schema: PrescriptionSchema },
      { name: 'intregration_api_key', schema: ApiKeySchema }
    ]
  )],
  controllers: [PrescriptionsController],
  providers: [PrescriptionService, UploadFileS3Service]
})
export class PrescriptionsModule {}
