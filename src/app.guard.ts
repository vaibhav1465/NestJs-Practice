import { Injectable, CanActivate, ExecutionContext, HttpException, BadRequestException, BadGatewayException, NotFoundException } from '@nestjs/common';
import { MyCustomError } from './custom.error';
import { GraphQLError } from 'graphql';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {

    console.log("APP GUARD FILE")
    // throw new BadGatewayException('Unauthorized');
    // throw new NotFoundException();
    // throw new GraphQLError("Graphql Error")
    return true;
  }
}
