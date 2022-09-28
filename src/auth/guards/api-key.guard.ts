import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { ApiKey } from '../interfaces/pharmacy.interface';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(@InjectModel('intregration_api_key') private readonly model: Model<ApiKey>) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.header('api_key');
   return this.validateRequest(authHeader);
  }
  async validateRequest(authHeader: ExecutionContext): Promise<boolean>{
    const apiKeyExist = await this.model.findOne({ apiKey:authHeader , status: true, type: 'integration' });
    if (!apiKeyExist) {
      throw new UnauthorizedException('not allow. Api key is not valid');
    }
    return true;
  }
}
