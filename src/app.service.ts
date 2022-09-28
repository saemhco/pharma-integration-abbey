import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) { }
  getHello(req: Request): string {
    const data = {
      APP_NAME: process.env.APP_NAME,
      NODE_ENV: this.configService.get('app.environment'),
      APP_VERSION: this.configService.get('app.version'),
      URL_API_DOC: `${req.protocol}://${req.get(
        'Host',
      )}/${this.configService.get('app.docs')}`,
    };
    return JSON.stringify(data);
  }
}
