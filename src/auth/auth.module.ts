import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApiKeySchema } from './schemas/apikey.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'intregration_api_key', schema: ApiKeySchema }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
