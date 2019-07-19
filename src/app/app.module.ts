import { Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Event } from '../event/model';

@Module({
  imports: [
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
