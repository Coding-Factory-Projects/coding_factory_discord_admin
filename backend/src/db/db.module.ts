import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [TypeormConfigService],
  exports: [TypeormConfigService],
})
export class DbModule { }
