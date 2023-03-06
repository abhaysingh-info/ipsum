import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { UserExtentionSchema } from './user.entity';
import { IUserExtention } from '@shared/interfaces/user';

export const MAX_TEAM_MEMBERS = 4;
export const MIN_TEAM_MEMBERS = 1;

@Schema()
export class Team extends Document {
  @Prop({ required: true, unique: true, type: String })
  teamID: string;

  @Prop({ required: true, type: String })
  teamName: string;

  @Prop({ required: true, type: UserExtentionSchema })
  leader: IUserExtention;

  @Prop({
    required: true,
    type: [UserExtentionSchema],
    maxlength: MAX_TEAM_MEMBERS,
  })
  teamMembers: IUserExtention[];

  @Prop({ required: true, type: Boolean, default: false })
  isLocked: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
export type TeamDocument = HydratedDocument<Team>;

// team extention for other fields
@Schema()
export class TeamExtention extends Document {
  @Prop({ required: true, type: String })
  teamID: string;

  @Prop({ required: true, type: String })
  teamName: string;

  @Prop({ required: true, type: UserExtentionSchema })
  leader: IUserExtention;

  @Prop({
    required: true,
    type: [UserExtentionSchema],
    maxlength: MAX_TEAM_MEMBERS,
  })
  teamMembers: IUserExtention[];

  @Prop({ required: true, type: Boolean, default: false })
  isLocked: boolean;
}

export const TeamExtentionSchema = SchemaFactory.createForClass(TeamExtention);
export type TeamExtentionDocument = HydratedDocument<TeamExtention>;
