import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GErrorHandlerFilter } from './g-error-handler/g-error-handler.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.useGlobalFilters(new GErrorHandlerFilter())
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
