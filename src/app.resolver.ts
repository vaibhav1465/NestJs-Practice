import { HttpException, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { Resolver,Query } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
// import { GraphQLErrorFilter } from "./graph.exception.filter";
import { AppGuard } from "./app.guard";
import { MyExceptionFilter } from "./graph.exception.filter";
import { AppInterceptor } from "./app.interceptor";
import { Any } from "typeorm";



@UseGuards(AppGuard)
@Resolver()
export class AppResolver {

    @Query(returns => String)
    getStarted(){
        console.log("RESOLVER FILE")
        // throw new HttpException('Unauthorized',401); 
        return "Hi GET Started";
    }

}