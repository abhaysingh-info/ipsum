import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from 'src/services/event/event.service';
import { S3Service } from 'src/services/s3/s3.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/entities/event.entity';
import { UserService } from 'src/services/user/user.service';
import { User, UserSchema } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { EventRegistrationService } from 'src/services/event-registration/event-registration.service';
import { TeamService } from 'src/services/team/team.service';
import {
  EventRegistration,
  EventRegistrationSchema,
} from 'src/entities/event-registration.entity';
import { Team, TeamSchema } from 'src/entities/team.entity';
import {
  TeamJoinRequest,
  TeamJoinRequestSchema,
} from 'src/entities/team-join-request.entity';

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
      {
        name: EventRegistration.name,
        schema: EventRegistrationSchema,
      },
      {
        name: Team.name,
        schema: TeamSchema,
      },
      {
        name: TeamJoinRequest.name,
        schema: TeamJoinRequestSchema,
      },
    ]),
  ],
  controllers: [EventController],
  providers: [
    EventService,
    UserService,
    S3Service,
    ConfigService,
    TeamService,
    EventRegistrationService,
  ],
})
export class EventModule {}
