import { Module } from '@nestjs/common';
import { PromotionsModule } from './promotions/promotions.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

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
