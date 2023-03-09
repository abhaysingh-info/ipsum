import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { eventType } from '@shared/interfaces/event';
import { UserExtention, UserExtentionSchema } from './user.entity';
import { TeamExtentionDocument, TeamExtentionSchema } from './team.entity';
import { IUserExtention, payment_status } from '@shared/interfaces/user';
import {
  EventRegistrationExtentionSchema,
  EventRegistrationExtentionDocument,
} from './event.entity';

@Schema()
export class EventRegistrationQuestionAnswer {
  @Prop({ required: true, type: String })
  question: string;

  @Prop({ required: true, type: String })
  answer: string;
}

const EventRegistrationQuestionAnswerSchema = SchemaFactory.createForClass(
  EventRegistrationQuestionAnswer,
);

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

  @Prop({
    type: [UserExtentionSchema],
  })
  teamMembers: IUserExtention[];

  @Prop({ required: true, type: Number, default: 0 })
  score: number;

  @Prop({ type: String, maxlength: 1500 })
  notes: string;

  @Prop({ type: Boolean, default: false })
  isPresent: boolean;

  @Prop({ type: Boolean, default: false })
  payment_made: boolean;

  @Prop({
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  })
  payment_status: payment_status;

  @Prop({ type: String })
  payment_screenshot: string;

  @Prop({ type: String, maxlength: 512 })
  payment_transaction_id: string;

  @Prop({ type: String, maxlength: 752 })
  payment_note: string;

  @Prop({
    type: [EventRegistrationQuestionAnswerSchema],
  })
  questionAnswer: EventRegistrationQuestionAnswer[];

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export type EventRegistrationDocument = HydratedDocument<EventRegistration>;
export const EventRegistrationSchema =
  SchemaFactory.createForClass(EventRegistration);
