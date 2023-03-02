import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { UserService } from 'src/services/user/user.service';
import { TeamService } from 'src/services/team/team.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from 'src/entities/team.entity';
import { User, UserSchema } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/services/s3/s3.service';
import {
  TeamJoinRequest,
  TeamJoinRequestSchema,
} from 'src/entities/team-join-request.entity';

@Module({
  controllers: [TeamController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema,
      },
      {
        name: TeamJoinRequest.name,
        schema: TeamJoinRequestSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, TeamService, ConfigService, S3Service],
})
export class TeamModule {}
