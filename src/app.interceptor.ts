import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    console.log("INTERCEPTOR CLASS - Starting");

    // throw new HttpException('Unauthorized',401); 

    return next.handle().pipe(
      map((data) => {
        console.log("INTERCEPTOR CLASS - ENDing");
        console.log("RESPONSE DATA", data);
        data = {data:"Updated Reponse from Interceptor"};
        return data;
      }),
      catchError((error) => {
        console.error("INTERCEPTOR ERROR", JSON.stringify(error));
        // You can handle or transform the error here before re-throwing
        // return throwError(error);
        // return error;

        if (error instanceof HttpException) {
            return of({ dataa : "new Data"});
        //    throw new HttpException(error.message,error.getStatus());
          }

        // throw new HttpException('Unauthorblibejlbfjlewbfjb ebfjlewbfized',401); 
        return throwError(error);
      })
    );
  }
}