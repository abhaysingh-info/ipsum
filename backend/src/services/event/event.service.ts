import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from 'src/dto/event/event.dto';
import { Event, EventDocument } from 'src/entities/event.entity';
import ControllerWrapper from 'src/utils/ControllerWrapper';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private EventModel: Model<EventDocument>,
  ) {}

  async create(event: CreateEventDto) {
    return await ControllerWrapper(async () => {
      const eventIdExists = await this.EventModel.countDocuments({
        eventId: event.eventId,
      });
      if (eventIdExists) {
        throw new BadRequestException(
          'eventId already exists, please use a different one',
        );
      }
      return await this.EventModel.create(event);
    });
  }

  async all(
    filter: {} = {},
    { startFrom, limit }: { startFrom: number; limit: number },
  ) {
    return await ControllerWrapper(async () => {
      const events = await this.EventModel.find(filter)
        .sort({ createdAt: 'descending' })
        .skip(startFrom)
        .limit(limit);
      return { data: events, limit, startFrom };
    });
  }
}
