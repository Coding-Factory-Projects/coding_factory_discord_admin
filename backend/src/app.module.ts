import { Module } from '@nestjs/common';
import { PromotionsModule } from './promotions/promotions.module';

@Module({
  imports: [PromotionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
