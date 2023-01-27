import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'postgres',
    password: 'hello',
    host: 'localhost',
    port: 5432,
    database: 'baza',
    entities: [User],
    synchronize: true
  }), UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
