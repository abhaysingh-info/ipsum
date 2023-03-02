import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
  Res,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { LoginUserDto } from '../../dto/user/login-user.dto';
import SetLogginToken from 'src/utils/SetLogginToken';
import { Response } from 'express';
import { AuthenticateGuard } from 'src/guards/authenticate/authenticate.guard';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { UserDocument } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { TeamService } from 'src/services/team/team.service';
import { IStringKey } from '@shared/interfaces';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if (user) {
      return {
        success: true,
        message: 'Congratulations Created Successfully!',
      };
    } else {
      return {
        success: false,
        message: 'We are sorry, there was an error while creating your account',
      };
    }
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.findOneByEmail(
      loginUserDto.email,
      true,
    );

    if (!user) {
      throw new NotFoundException(
        `User with email ${loginUserDto.email} not found!`,
      );
    }

    const doesProvidedPasswordMatchUserPassword: boolean =
      await user.comparePassword(loginUserDto.password);

    if ((user.passwordTries as number) >= 5) {
      throw new UnauthorizedException(
        'Your account is Blocked please check your email for further instructions or request a password reset!',
      );
    }

    if (!doesProvidedPasswordMatchUserPassword) {
      user.passwordTries = ((user.passwordTries as number) + 1) as Number;
      if ((user.passwordTries as number) >= 5) {
        user.isBlocked = true;
      }
      await user.save();

      throw new UnauthorizedException(
        'Email or password you entered is incorrect!',
      );
    } else {
      user.passwordTries = 0;
      await user.save();
    }

    if (user.isBlocked) {
      throw new UnauthorizedException(
        'Your account is Blocked please check your email for further instructions or request a password reset!',
      );
    }

    if (user.suspended) {
      throw new UnauthorizedException(
        'Your account is suspended, if you think this was a mistake please contact our support',
      );
    }

    const userTeam: any = await this.teamService.getTeam({ user });

    if (userTeam) {
      if ((userTeam.leader_id as any) === user._id) {
        userTeam.leader_id = user.email;
      } else {
        const leader = await this.userService.getUserById(
          userTeam.leader_id,
          false,
          {
            email: 1,
          },
        );
        userTeam.leader_id = leader.email;
      }
      (user as any).team = userTeam;
    }

    return await SetLogginToken(res, user);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    res.clearCookie('roles');
    return { success: true };
  }

  @Post('login/verify')
  @UseGuards(AuthenticateGuard)
  async verifyLoggin(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: UserDocument,
  ) {
    if (user?._id) {
      const userTeam: any = await this.teamService.getTeam({ user });

      if (userTeam) {
        if ((userTeam.leader_id as any) === user._id) {
          userTeam.leader_id = user.email;
        } else {
          const leader = await this.userService.getUserById(
            userTeam.leader_id,
            false,
            {
              email: 1,
            },
          );
          userTeam.leader_id = leader.email;
        }
        (user as any).team = userTeam;
      }
      let data = {
        ...(await SetLogginToken(res, user)),
        success: true,
      };
      return data;
    }
    res.clearCookie('token');
    res.clearCookie('roles');
    return { success: false };
  }

  @Patch()
  @UseGuards(AuthenticateGuard)
  update(
    @CurrentUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user._id.toString(), updateUserDto);
  }

  @Delete()
  @UseGuards(AuthenticateGuard)
  remove(@CurrentUser() user: UserDocument) {
    return this.userService.remove(user._id.toString());
  }

  @Post('payment/:transaction_id')
  @UseGuards(AuthenticateGuard)
  @UseInterceptors(
    FileInterceptor('transaction_image', {
      fileFilter(req, file, callback) {
        const allowedMimeType = [
          'image/png',
          'image/webp',
          'image/jpeg',
          'image/jpg',
        ];
        if (!allowedMimeType.includes(file.mimetype)) {
          callback(new BadRequestException(`Invalid file provided!`), false);
          return;
        }
        callback(null, true);
      },
    }),
  )
  accept_user_payment(
    @Param('transaction_id') transaction_id: string,
    @UploadedFile() transaction_image: Express.Multer.File,
    @CurrentUser() currentUser: UserDocument,
  ) {
    return this.userService.capturePayment(
      transaction_id,
      transaction_image,
      currentUser,
    );
  }
}
