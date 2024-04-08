import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, NotFoundException, BadGatewayException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { MyCustomError } from './custom.error';
import { GraphQLError } from 'graphql';

@Catch(MyCustomError,BadGatewayException,NotFoundException,HttpException)
export class MyExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

      console.log("EXCEPTION FILTER CLASS")
      console.log("status", exception.getStatus());
      const gqlHost = GqlArgumentsHost.create(host);
      const req = gqlHost.getContext().req;
    //   Handle your exception here
    let status = exception.getStatus() || 200;
      if (req && req.res) {  // Add null check
        req.res.status(status).json({
          message   : exception.message,
          name      : exception.name,
          stack     : exception.stack,
          statusCode : status,
          timeStamp  : new Date().toISOString(),
          url        : req.url,
          host       : req.get("host")
        });
      }
    }
}

@Catch(GraphQLError)
export class GraphQLErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost){
    console.log("Graphql Error FILTER CLASS");
    // console.log("status", exception.getStatus());
          const gqlHost = GqlArgumentsHost.create(host);
          const req = gqlHost.getContext().req;
        //   Handle your exception here
        let status = 400;
          if (req && req.res) {  // Add null check
            req.res.status(status).json({
              message   : exception.message,
              name      : exception.name,
              stack     : exception.stack,
              timeStamp  : new Date().toISOString(),
              url        : req.url,
              host       : req.get("host")
            });
          }
  }
}



// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
// import { GqlArgumentsHost } from '@nestjs/graphql';
// import { MyCustomError } from './custom.error';
// import { GraphQLError } from 'graphql';

// @Catch(HttpException)
// export class MyExceptionFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {

//       console.log("EXCEPTION FILTER CLASS")
//       console.log("status", exception.getStatus());
//       const gqlHost = GqlArgumentsHost.create(host);
//       const req = gqlHost.getContext().req;
//     //   Handle your exception here
//     let status = exception.getStatus();
//       if (req && req.res) {  // Add null check
//         req.res.status(status).json({
//           message   : exception.message,
//           name      : exception.name,
//           stack     : exception.stack
//         });
//       }
//     }
//   }

// Catch(GraphQLError)
// export class BadExceptionFilter implements ExceptionFilter {
//   catch(exception: GraphQLError, host: ArgumentsHost){
//     console.log("Bad EXCEPTION FILTER CLASS");
//     // console.log("status", exception.getStatus());
//           const gqlHost = GqlArgumentsHost.create(host);
//           const req = gqlHost.getContext().req;
//         //   Handle your exception here
//         let status = 400;
//           if (req && req.res) {  // Add null check
//             req.res.status(status).json({
//               message   : exception.message,
//               name      : exception.name,
//               stack     : exception.stack
//             });
//           }
//   }
// }

// import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
// import { GqlArgumentsHost } from "@nestjs/graphql";
// import { GraphQLError } from "graphql";
// import { Request,Response } from "express";

// @Catch(HttpException)
// export class GraphQLErrorFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {

//     console.log("EXCEPTION FILTER")

//     const gqlHost = GqlArgumentsHost.create(host);
//     const response = gqlHost.getContext().response as Response;

//     console.log("RESPONSE OBJECT",response)

//     console.log("EXCEPTOION OBJECT",exception)

//     // const statusCode = exception.extensions?.exception?.status || 500;
//     const message = exception.message || 'Internal Server Error';
//     // const code = exception.extensions?.code || 'INTERNAL_SERVER_ERROR';

//     response.status(200).json({
//       errors: [
//         {
//           message,
//           extensions: {
//             // code,
//             // stacktrace: exception.extensions?.exception?.stacktrace || [],
//           },
//         },
//       ],
//       data: null,
//     });
//   }
// }


// import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
// import { GqlArgumentsHost } from '@nestjs/graphql';
// import { HttpException } from '@nestjs/common';

// @Catch(HttpException)
// export class GraphQLErrorFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const gqlHost = GqlArgumentsHost.create(host);
//     const response = gqlHost.getContext().response;

//     const status = exception.getStatus();
//     const message = exception.getResponse();


//     console.log("RESPONSE OBJECT",response)

//         console.log("EXCEPTOION OBJECT",exception)

//     response.status(status).json({
//       errors: [
//         {
//           message,
//         },
//       ],
//       data: null,
//     });
//   }
// }
