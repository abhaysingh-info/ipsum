import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Team, TeamDocument } from 'src/entities/team.entity';
import { UserService } from '../user/user.service';
import { CreateTeamDto } from 'src/dto/team/team.dto';
import { UserDocument } from 'src/entities/user.entity';
import {
  TeamJoinRequest,
  TeamJoinRequestDocument,
} from 'src/entities/team-join-request.entity';
import { IUserExtention } from '@shared/interfaces/user';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private TeamModal: Model<TeamDocument>,
    private userService: UserService,
    @InjectModel(TeamJoinRequest.name)
    private TeamJoinRequestModal: Model<TeamJoinRequestDocument>,
  ) {}

  async create(createTeam: CreateTeamDto, user: UserDocument) {
    const userAlreadyInATeam = await this.getTeam({ user });
    if (userAlreadyInATeam) {
      throw new HttpException('You are already in a team', 400);
    }
    return this.TeamModal.create({ ...createTeam, leader: user });
  }

  async deleteUsersTeamIfLeader(user: UserDocument) {
    const team = await this.getTeam({ user });
    if (!team) {
      throw new BadRequestException('You are not in a team');
    }
    if (user._id !== (team.leader._id as any)) {
      throw new BadRequestException(
        'You are not the leader of this team so you cannot delete it',
      );
    }
    if (team.isLocked) {
      throw new BadRequestException('You cannot delete a locked team');
    }
    return await this.TeamModal.deleteOne({ _id: team._id });
  }

  async updateTeamLockStatus({
    user,
    isLocked,
    team_id,
  }: {
    user?: UserDocument;
    isLocked: boolean;
    team_id?: ObjectId;
  }) {
    let team: TeamDocument;
    if (user) {
      team = await this.getTeam({ user });
    } else {
      team = await this.getTeam({ team_id });
    }
    team.isLocked = isLocked ? true : false;
    return await team.save();
  }

  async joinTeam(team_code: string, user: UserDocument) {
    const userAlreadyMadeAnyRequest = await this.TeamJoinRequestModal.findOne({
      user_id: user._id,
    });
    if (userAlreadyMadeAnyRequest) {
      throw new BadRequestException(
        'You already made a request to join a team',
      );
    }
    const userInATeam = await this.getTeam({ user });
    if (userInATeam) {
      throw new BadRequestException('You are already in a team');
    }
    const team = await this.getTeam({ team_code });
    if (!team) {
      throw new BadRequestException('Team does not exist');
    }

    if ((team.leader._id as any) === user._id) {
      throw new BadRequestException('You are leader of this team');
    }

    if (team.isLocked) {
      throw new BadRequestException('Team is locked');
    }

    const teamMemberExists = team.teamMembers.find(
      (team_member) => (team_member._id as any) === user._id,
    );
    if (teamMemberExists) {
      throw new BadRequestException('User is already in the team');
    }
    return await this.TeamJoinRequestModal.create({
      team_id: team._id,
      user: user,
    });
  }

  async withdrawAllJoinRequests(user: UserDocument) {
    const withdrawAllJoinRequests = await this.TeamJoinRequestModal.deleteMany({
      user_id: user._id,
      accepted: false,
    });
    if (withdrawAllJoinRequests.deletedCount === 0) {
      throw new BadRequestException(
        'You have already being accepted into the team or may have not made any request',
      );
    }
    return { success: true };
  }

  async addMemberToTeam(member_email: string, user: UserDocument) {
    const team = await this.getTeam({ user });
    const member = await this.userService.findOneByEmail(member_email);
    if (!team) {
      throw new BadRequestException('Team does not exist');
    }
    if (!member) {
      throw new BadRequestException('User does not exist');
    }
    if (team.isLocked) {
      throw new BadRequestException('Team is locked');
    }
    if ((team.leader._id as any) === member._id) {
      throw new BadRequestException('You are leader of this team');
    }

    const teamMemberExists = team.teamMembers.find(
      (team_member) => (team_member._id as any) === member._id,
    );
    if (teamMemberExists) {
      throw new BadRequestException('User is already in the team');
    }
    team.teamMembers.push(user as any);
    return await team.save();
  }

  async acceptTeamJoinRequest(
    request_id: ObjectId,
    accept: boolean,
    user: UserDocument,
  ) {
    const request = await this.TeamJoinRequestModal.findOne({
      _id: request_id,
    });
    if (!request) {
      throw new NotFoundException('Request does not exist');
    }

    const team = await this.getTeam({ team_id: request.team_id as any });
    if (!team) {
      throw new NotFoundException('Team does not exist');
    }

    if (user._id !== (team.leader._id as any)) {
      throw new BadRequestException('You are not the leader of this team');
    }

    const member = await this.userService.getUserById(request.user._id as any);
    if (!member) {
      throw new NotFoundException('User does not exist');
    }

    if (team.isLocked) {
      throw new BadRequestException('Team is locked');
    }

    console.log(member._id === (team.leader._id as any));
    if (member._id === (team.leader._id as any)) {
      throw new BadRequestException('You are leader of this team');
    }

    const teamMemberExists = team.teamMembers.find(
      (team_member) => (team_member._id as any) === member._id,
    );

    if (teamMemberExists) {
      throw new BadRequestException('User is already in the team');
    }

    if (accept === true) {
      team.teamMembers.push(member as any);
      await team.save();
    }
    await this.TeamJoinRequestModal.updateOne(
      { _id: request_id },
      { isAccepted: accept },
    );
    return {
      success: true,
    };
  }

  async leaveTeam(user: UserDocument) {
    const team = await this.getTeam({ user });
    if (!team) {
      throw new BadRequestException('You are not in a team');
    }
    if (user._id === (team.leader._id as any)) {
      throw new BadRequestException('You are the leader of this team');
    }
    if (team.isLocked) {
      throw new BadRequestException('Team is locked');
    }
    team.teamMembers = team.teamMembers.filter(
      (member) => member.email !== user.email,
    );
    await team.save();
    return { success: true };
  }

  async getTeam({
    user,
    team_code,
    team_id,
  }: {
    user?: UserDocument;
    team_id?: ObjectId;
    team_code?: string;
  }) {
    let team: TeamDocument;
    if (user) {
      team = await this.TeamModal.findOne({
        $or: [
          { 'leader._id': user._id },
          {
            teamMembers: {
              $elemMatch: {
                email: user.email,
              },
            },
          },
        ],
      });
    } else if (team_id) {
      team = await this.TeamModal.findOne({ _id: team_id });
    } else if (team_code) {
      team = await this.TeamModal.findOne();
    } else {
      throw new BadRequestException('Invalid request');
    }
    return team;
  }
}
