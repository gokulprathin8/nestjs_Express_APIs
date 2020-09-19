import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1807',
    database: 'taskmanagement',
    entities: [join(__dirname + '/../**/*.entity.{ts,js}')],
    synchronize: true,

}