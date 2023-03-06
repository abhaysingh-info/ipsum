import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  EventRegistration,
  EventRegistrationDocument,
} from 'src/entities/event-registration.entity';
import { UserDocument } from 'src/entities/user.entity';
import ControllerWrapper from 'src/utils/ControllerWrapper';
import { S3Service } from '../s3/s3.service';
import { TeamService } from '../team/team.service';
import { EventService } from '../event/event.service';
import { CreateEventRegistrationDto } from 'src/dto/event-registration/event-registration.dto';

@Injectable()
export class EventRegistrationService {
  constructor(
    @InjectModel(EventRegistration.name)
    private EventRegistrationModel: Model<EventRegistrationDocument>,
    private s3Service: S3Service,
    private teamService: TeamService,
    private eventService: EventService,
  ) {}

  getParticipatedEventIds(user: UserDocument) {
    return ControllerWrapper(async () => {
      const eventRegistrations = await this.EventRegistrationModel.distinct(
        'event',
        {
          'user._id': user._id,
        },
      );
      return eventRegistrations.map((eventRegistration) =>
        eventRegistration.eventId.toString(),
      );
    });
  }

  async participateInEvent(
    createEventRegistrationDto: CreateEventRegistrationDto,
    user: UserDocument,
    allowMajorityRegistration: boolean = false,
  ) {
    return await ControllerWrapper(async () => {
      const eventId = new Types.ObjectId(createEventRegistrationDto.eventId);
      const event = await this.eventService.getEventById(eventId as any);

      if (!event) {
        throw new BadRequestException('Invalid ID provided!');
      }

      if (Date.now() >= new Date(event.registrationClosesOn).getTime()) {
        throw new BadRequestException('Registration for this event is closed!');
      }

      if (event.eventType === 'individual') {
        const eventRegistrationExists =
          await this.EventRegistrationModel.countDocuments({
            'event._id': eventId,
            'user._id': user._id,
          });
        if (eventRegistrationExists) {
          throw new BadRequestException(
            'You have already registered for this event!',
          );
        } else {
          const userInBatch = await this.EventRegistrationModel.countDocuments({
            'event.eventBatch': event.eventBatch,
            $or: [
              { 'user._id': user._id },
              {
                'team.teamMembers': {
                  $elemMatch: {
                    _id: user._id,
                  },
                },
              },
              {
                'team.leader._id': user._id,
              },
            ],
          });
          if (userInBatch) {
            throw new BadRequestException(
              'You or your team has already registered for an event in this batch!',
            );
          }
          await this.EventRegistrationModel.create({
            event: event,
            user,
            eventType: 'individual',
          });
          return { success: true };
        }
      } else {
        const users_team = await this.teamService.getTeam({ user });
        const eventRegistrationExists =
          await this.EventRegistrationModel.countDocuments({
            'event._id': eventId,
            'team._id': users_team._id,
          });

        if (eventRegistrationExists) {
          throw new BadRequestException(
            'Your team has already registered for this event!',
          );
        } else {
          const allMembersList = users_team.teamMembers.map(
            (member) => member._id,
          );
          allMembersList.push(users_team.leader._id);
          const userInBatch = await this.EventRegistrationModel.countDocuments({
            'event.eventBatch': event.eventBatch,
            $or: [
              {
                'user._id': {
                  $in: allMembersList,
                },
              },
              {
                'team.teamMembers': {
                  $elemMatch: {
                    _id: {
                      $in: allMembersList,
                    },
                  },
                },
              },
              {
                'team.leader._id': { $in: allMembersList },
              },
            ],
          });

          if (
            allowMajorityRegistration &&
            100 * (userInBatch / allMembersList.length) < 60
          ) {
            throw new BadRequestException(
              'Your team has less than 60% of the members available during this event!',
            );
          } else {
            if (userInBatch) {
              throw new BadRequestException(
                'You have already registered for an event in this batch!',
              );
            }
          }

          await this.EventRegistrationModel.create({
            event: event,
            team: users_team,
            eventType: 'team',
          });
          return { success: true };
        }
      }

      return {};
    });
  }
}
