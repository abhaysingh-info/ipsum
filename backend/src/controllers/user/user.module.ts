import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../entities/user.entity';
import { AttachUserMiddleware } from 'src/middlewares/attach-user/attach-user.middleware';
import { S3Service } from 'src/services/s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, S3Service, ConfigService],
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
