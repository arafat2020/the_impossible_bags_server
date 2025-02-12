import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/main.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { DbModule } from './db/db.module';
import { GErrorHandlerModule } from './g-error-handler/g-error-handler.module';
import { LibModule } from './lib/lib.module';

@Module({
  imports: [ MainModule, MiddlewareModule, DbModule, GErrorHandlerModule, LibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
