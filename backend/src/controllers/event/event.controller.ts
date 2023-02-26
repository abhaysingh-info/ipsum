import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import roles from '@shared/utils/dist/roles';
import { CreateEventDto } from 'src/dto/event/event.dto';
import { AuthenticateGuard } from 'src/guards/authenticate/authenticate.guard';
import { HasRoleGuard } from 'src/guards/has-role/has-role.guard';
import { EventService } from 'src/services/event/event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @UseGuards(AuthenticateGuard, HasRoleGuard(roles.admin))
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }

  @Delete('/:id')
  @UseGuards(AuthenticateGuard, HasRoleGuard(roles.admin))
  async delete(@Param('id') id: string) {
    return await this.eventService.delete(id);
  }

  @Get()
  async all(
    @Query('startFrom') _startFrom: string,
    @Query('limit') _limit: string,
  ) {
    const MAX_LIMIT = 20;
    let startFrom: number = +_startFrom;
    let limit: number = +_limit || 7;
    if (!limit) {
      limit = 7;
    }
    if (limit > MAX_LIMIT) {
      limit = MAX_LIMIT;
    }
    if (!startFrom) {
      startFrom = 0;
    }
    return await this.eventService.all({}, { startFrom, limit });
  }
}
