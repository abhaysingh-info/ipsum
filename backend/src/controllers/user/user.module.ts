import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../entities/user.entity';
import { AttachUserMiddleware } from 'src/middlewares/attach-user/attach-user.middleware';
import { S3Service } from 'src/services/s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { TeamService } from 'src/services/team/team.service';
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
        name: Team.name,
        schema: TeamSchema,
      },
      {
        name: TeamJoinRequest.name,
        schema: TeamJoinRequestSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, S3Service, ConfigService, TeamService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AttachUserMiddleware)
      .exclude('/user/login', {
        path: '/user',
        method: RequestMethod.POST,
      })
      .forRoutes('*');
  }
}
