// import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
// import { Observable, map } from "rxjs";


// export class AppInterceptor implements NestInterceptor{
//     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    

//         console.log("INTERCEPTOR CLASS")

//         const ctx = context.switchToHttp();
//         const request = ctx.getRequest<Request>()

        
//         return next.handle().pipe(map((data)=>{

//             console.log("RESPONSE DATA",data)

//             data = "from interceptors"
//             // data.name  = "interceptor";
//             return data;

//         }))
//     }
    
// }


import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    console.log("INTERCEPTOR CLASS - Start");

    // throw new HttpException('Unauthorized',401); 

    return next.handle().pipe(
      map((data) => {
        console.log("INTERCEPTOR CLASS - END");
        console.log("RESPONSE DATA", data);
        // data = "from interceptors";
        return data;
      }),
      catchError((error) => {
        console.error("INTERCEPTOR ERROR", JSON.stringify(error));
        // You can handle or transform the error here before re-throwing
        // return throwError(error);
        // return error;
        // throw new HttpException('Unauthorblibejlbfjlewbfjb ebfjlewbfized',401); 
        return error;
      })
    );
  }
}