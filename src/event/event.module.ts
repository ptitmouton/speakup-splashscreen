import { Module } from '@nestjs/common';
// import { EventService } from './event.service';
// import { Event, TicketType } from './model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';

@Module({
  imports: [],
  controllers: [EventController],
  // providers: [EventService],
  // exports: [EventService],
})
export class EventModule { }
