import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { eventType } from '@shared/interfaces/event';
import { UserExtentionSchema } from './user.entity';
import { TeamExtentionDocument, TeamExtentionSchema } from './team.entity';
import { IUserExtention } from '@shared/interfaces/user';
import {
  EventRegistrationExtentionSchema,
  EventRegistrationExtentionDocument,
} from './event.entity';

@Schema()
export class EventRegistration extends Document {
  @Prop({ required: true, type: EventRegistrationExtentionSchema })
  event: EventRegistrationExtentionDocument;

  @Prop({
    type: TeamExtentionSchema,
  })
  team: TeamExtentionDocument;

  @Prop({
    type: UserExtentionSchema,
  })
  user: IUserExtention;

  @Prop({ required: true, type: Number, default: 0 })
  score: number;

  @Prop({ type: String, maxlength: 1500 })
  notes: string;

  @Prop({ type: Boolean, default: false })
  isPresent: boolean;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export type EventRegistrationDocument = HydratedDocument<EventRegistration>;
export const EventRegistrationSchema =
  SchemaFactory.createForClass(EventRegistration);
