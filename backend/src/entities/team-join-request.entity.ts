// team join request based on team entity

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { User } from './user.entity';
import { Team } from './team.entity';

@Schema()
export class TeamJoinRequest {
  // team_id: ObjectId;
  @Prop({ required: true, type: Types.ObjectId, ref: Team.name })
  team_id: ObjectId;

  // user_id: ObjectId;
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user_id: ObjectId;

  // isAccepted: boolean;
  @Prop({ required: true, type: Boolean, default: false })
  accepted: boolean;
}

export const TeamJoinRequestSchema =
  SchemaFactory.createForClass(TeamJoinRequest);
export type TeamJoinRequestDocument = HydratedDocument<TeamJoinRequest>;
