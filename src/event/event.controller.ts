import { Controller, Get, Render } from '@nestjs/common';
// import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor() { }

  @Get()
  @Render('event/events')
  async getEvent(): Promise<any> {
    // const events = await this.eventService.events();
    // return {
    //   event: events[0],
    // };
    return {};
  }
}