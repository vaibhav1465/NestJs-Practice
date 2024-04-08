import { Injectable, CanActivate, ExecutionContext, HttpException, BadRequestException, BadGatewayException } from '@nestjs/common';
import { MyCustomError } from './custom.error';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {

    console.log("APP GUARD FILE")
    // throw new BadGatewayException('Unauthorized');
    throw new MyCustomError();
    return true;
  }
}
