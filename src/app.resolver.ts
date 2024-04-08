import { HttpException, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { Resolver,Query } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
// import { GraphQLErrorFilter } from "./graph.exception.filter";
import { AppGuard } from "./app.guard";
// import { MyExceptionFilter } from "./graph.exception.filter";
import { AppInterceptor } from "./app.interceptor";
import { Any } from "typeorm";
import { SampleReponse } from "./sample.response";



@UseGuards(AppGuard)
@Resolver()
export class AppResolver {

    @Query(returns => SampleReponse)
    getStarted(){
        console.log("RESOLVER FILE")
        // throw new HttpException('GraphQl Custom Error',200); 
        return "Hi GET Started";
    }
}