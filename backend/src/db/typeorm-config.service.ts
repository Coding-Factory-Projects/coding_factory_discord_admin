import { join } from 'path';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _connectionName?: string,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('TYPEORM_HOST'),
      port: this.config.get<number>('TYPEORM_PORT'),
      username: this.config.get<string>('TYPEORM_USERNAME'),
      password: this.config.get<string>('TYPEORM_PASSWORD'),
      database: this.config.get<string>('TYPEORM_DATABASE'),
      entities: [join(__dirname, '../../dist/**/entity/**/*.js')],
      synchronize: this.config.get<boolean>('TYPEORM_SYNCHRONIZE'),
    };
  }
}
