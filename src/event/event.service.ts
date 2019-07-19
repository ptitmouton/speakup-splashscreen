// import { Injectable } from '@nestjs/common';
// import { Event, TicketType } from './model';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class EventService {

//   constructor(
//     @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
//     @InjectRepository(TicketType) private readonly ticketTypeRepository: Repository<TicketType>,
//   ) { }

//   async events(): Promise<Event[]> {
//     return this.eventRepository.find({ cache: true });
//   }

//   async getEventById(id: number): Promise<Event | null> {
//     return this.eventRepository.findOne(id, { cache: true });
//   }

//   async getTicketById(id: number): Promise<TicketType | null> {
//     return this.ticketTypeRepository.findOne(id, { cache: true });
//   }
// }
