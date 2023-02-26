import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from 'src/services/event/event.service';
import { S3Service } from 'src/services/s3/s3.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/entities/event.entity';
import { UserService } from 'src/services/user/user.service';
import { User, UserSchema } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService, UserService, S3Service, ConfigService],
})
export class EventModule {}
