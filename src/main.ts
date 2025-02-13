import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GErrorHandlerFilter } from './g-error-handler/g-error-handler.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The Imposable Bags')
    .setDescription('An API service for The Imposable Bags')
    .setVersion('1.0')
    .addTag('bags')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.useGlobalFilters(new GErrorHandlerFilter())
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
