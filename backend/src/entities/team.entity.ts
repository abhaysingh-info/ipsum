import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { User } from './user.entity';

console.log(User.name);

@Schema()
export class Team extends Document {
  @Prop({ required: true, unique: true, type: String })
  teamID: string;

  @Prop({ required: true, unique: true, type: String, ref: User.name })
  leader_id: string;

  @Prop({ required: true, type: String })
  teamName: string;

  @Prop({ required: true, type: [String] })
  teamMembersEmail: string[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
export type TeamDocument = HydratedDocument<Team>;
