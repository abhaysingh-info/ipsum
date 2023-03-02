import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId, Types } from 'mongoose';
import { User } from './user.entity';

@Schema()
export class Team extends Document {
  @Prop({ required: true, unique: true, type: String })
  teamID: string;

  @Prop({ required: true, type: String })
  teamName: string;

  @Prop({
    required: true,
    unique: true,
    type: Types.ObjectId,
    ref: User.name,
  })
  leader_id: ObjectId;

  @Prop({ required: true, type: [String] })
  teamMembersEmail: string[];

  @Prop({ required: true, type: Boolean, default: false })
  isLocked: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
export type TeamDocument = HydratedDocument<Team>;
