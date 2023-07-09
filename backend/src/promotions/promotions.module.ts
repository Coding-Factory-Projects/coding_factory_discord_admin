import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Student } from './entities/student.entity';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion, Student]), BotModule],
  controllers: [PromotionsController],
  providers: [PromotionsService],
})
export class PromotionsModule {}
