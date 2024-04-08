import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {  BadExceptionFilter, MyExceptionFilter } from './graph.exception.filter';
import { AppInterceptor } from './app.interceptor';
import { MyCustomError } from './custom.error';

;



@Module({
  imports: [GraphQLModule.forRoot({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts')
    }
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({
      isGlobal: true,
    })],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [],
      synchronize: true,
      // logging:true
    }),
    inject: [ConfigService],
  })],
  controllers: [],
  providers: [AppResolver,MyCustomError,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: AppInterceptor,
    // },
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter
    },
    {
      
        provide: APP_FILTER,
        useClass: BadExceptionFilter,
    }
  ]
})

export class AppModule { }
