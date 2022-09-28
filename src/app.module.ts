import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { appConfig } from './config/app';
import { MongooseConnectionService } from './config/connections/mongoose-connection.service';
import { databaseConfig } from './config/database';
import { jwtConfig } from './config/jwt';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { CustomersModule } from './customers/customers.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { enviroments } from './enviroments';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig,],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConnectionService,
    }),
    // AuthModule,
    // UsersModule,
    PharmacyModule,
    CustomersModule,
    PrescriptionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
