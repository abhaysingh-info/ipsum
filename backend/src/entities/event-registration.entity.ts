import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class EventRegistration extends Document {
  @Prop({ required: true, ref: 'Event', type: String })
  eventId: string;

  @Prop({ required: true, ref: 'Team', type: String })
  teamId: string;

  @Prop({ required: true, type: Number })
  score: number;

  @Prop({ type: String, maxlength: 1500 })
  notes: string;
}

export type EventRegistrationDocument = HydratedDocument<EventRegistration>;
export const EventRegistrationSchema =
  SchemaFactory.createForClass(EventRegistration);
