import { Module } from '@nestjs/common';
import { PromotionsModule } from './promotions/promotions.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PromotionsModule,
    DbModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
