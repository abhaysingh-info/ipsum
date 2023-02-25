import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateEventDto } from 'src/dto/event/event.dto';
import { EventService } from 'src/services/event/event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }

  @Get()
  async all(@Query('startFrom') _startFrom: string) {
    let startFrom: number = +_startFrom;
    const limit: number = 7;
    if (!startFrom) {
      startFrom = 0;
    }
    return await this.eventService.all({}, { startFrom, limit });
  }
}
