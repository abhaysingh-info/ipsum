import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId, Types } from 'mongoose';
import { User, UserExtentionSchema } from './user.entity';
import { IUserExtention } from '@shared/interfaces/user';

@Schema()
export class Team extends Document {
  @Prop({ required: true, unique: true, type: String })
  teamID: string;

  @Prop({ required: true, type: String })
  teamName: string;

  @Prop({ required: true, type: UserExtentionSchema })
  leader: IUserExtention;

  @Prop({ required: true, type: [UserExtentionSchema] })
  teamMembers: IUserExtention[];

  @Prop({ required: true, type: Boolean, default: false })
  isLocked: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
export type TeamDocument = HydratedDocument<Team>;
