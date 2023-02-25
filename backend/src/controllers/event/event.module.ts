import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from 'src/services/event/event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/entities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
