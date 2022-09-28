import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApikeyadminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('api_key');
    const isAuth = authHeader === process.env.API_KEY_ADMIN;
    if (!isAuth) {
       throw new UnauthorizedException('not allow');
    }
    return isAuth;
  }
}
