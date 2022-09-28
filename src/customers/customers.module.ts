import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeySchema } from 'src/auth/schemas/apikey.schema';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'customers', schema: CustomerSchema},{ name: 'intregration_api_key', schema: ApiKeySchema }])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
