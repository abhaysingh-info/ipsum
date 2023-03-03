import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import roles from '@shared/utils/dist/roles';
import { ObjectId, Types } from 'mongoose';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AcceptJoinRequestDto } from 'src/dto/team/acceot-join-request.dto';
import { CreateTeamDto } from 'src/dto/team/team.dto';
import { UserDocument } from 'src/entities/user.entity';
import { AuthenticateGuard } from 'src/guards/authenticate/authenticate.guard';
import { HasRoleGuard } from 'src/guards/has-role/has-role.guard';
import { TeamService } from 'src/services/team/team.service';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  @UseGuards(AuthenticateGuard)
  async create(
    @Body() createTeamDto: CreateTeamDto,
    @CurrentUser() user: UserDocument,
  ) {
    return await this.teamService.create(createTeamDto, user);
  }

  @Get()
  @UseGuards(AuthenticateGuard)
  async getTeam(@CurrentUser() user: UserDocument) {
    return await this.teamService.getTeam({ user });
  }

  @Delete()
  @UseGuards(AuthenticateGuard)
  async deleteTeam(@CurrentUser() user: UserDocument) {
    return await this.teamService.deleteUsersTeamIfLeader(user);
  }

  @Post('lock')
  @UseGuards(AuthenticateGuard)
  async updateLockStatus(@CurrentUser() user: UserDocument) {
    return await this.teamService.updateTeamLockStatus({
      user: user,
      isLocked: true,
    });
  }

  @Post('/:team_id/unlock')
  @UseGuards(AuthenticateGuard, HasRoleGuard(roles.admin))
  async unlockTeam(@Param('team_id') _team_id: string) {
    const team_id: ObjectId = new Types.ObjectId(_team_id) as any;
    return await this.teamService.updateTeamLockStatus({
      isLocked: false,
      team_id,
    });
  }

  @Post('/accept-join-request')
  @UseGuards(AuthenticateGuard)
  async acceptTeamJoinRequest(
    @CurrentUser() user: UserDocument,
    @Body() acceptJoinRequestDto: AcceptJoinRequestDto,
  ) {
    return await this.teamService.acceptTeamJoinRequest(
      new Types.ObjectId(acceptJoinRequestDto.request_id) as any,
      acceptJoinRequestDto.accept,
      user,
    );
  }

  @Post('/:team_code/join')
  @UseGuards(AuthenticateGuard)
  async joinTeam(
    @CurrentUser() user: UserDocument,
    @Param('team_code') team_code: string,
  ) {
    if (!team_code?.length)
      throw new BadRequestException('Team code is required');
    team_code = team_code.toLowerCase();
    return await this.teamService.joinTeam(team_code, user);
  }

  @Get('/join')
  @UseGuards(AuthenticateGuard)
  async getTeamJoinRequests(@CurrentUser() user: UserDocument) {
    return await this.teamService.getTeamJoinRequest(user);
  }

  @Post('/withdraw-join-request')
  @UseGuards(AuthenticateGuard)
  async withdrawJoinRequest(@CurrentUser() user: UserDocument) {
    return await this.teamService.withdrawAllJoinRequests(user);
  }
}
