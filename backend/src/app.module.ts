import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsModule } from './promotions/promotions.module';
import { DbModule } from './db/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeormConfigService } from './db/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PromotionsModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
