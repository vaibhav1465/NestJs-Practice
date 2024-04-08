import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLErrorExceptionFilter } from './graph.exception.filter';
import { MyExceptionFilter } from './graph.exception.filter';
import { AppInterceptor } from './app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GraphQLErrorExceptionFilter());
  app.useGlobalFilters(new MyExceptionFilter());
  app.useGlobalInterceptors(new AppInterceptor())
  await app.listen(3000);
}
bootstrap();
