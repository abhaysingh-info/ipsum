import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import {eventType} from "@shared/interfaces/event"

@Schema()
export class EventRegistration extends Document {
  @Prop({ required: true, ref: 'Event', type: String })
  eventId: string;

  @Prop({ required: true, type: String, enum: ['individual', 'team'] })
  eventIsIndividual:eventType;

  @Prop({ ref: 'Team', type: String, validate: {
    validator: (v: string) => (this as any).eventIsIndividual === 'team' ? v : true,
    message: 'teamId is required for team events'}
  })
  teamId: string;

  @Prop({ ref: 'User', type: String , validate: {
    validator: (v: string) => (this as any).eventIsIndividual === 'individual' ? v : true,
    message: 'userId is required for individual events'
  }
  })
  userId: string;
  
  @Prop({ required: true, type: Number })
  score: number;

  @Prop({ type: String, maxlength: 1500 })
  notes: string;

  @Prop({ required: true, type: Date })
  createdAt: Date;
}

export type EventRegistrationDocument = HydratedDocument<EventRegistration>;
export const EventRegistrationSchema =
  SchemaFactory.createForClass(EventRegistration);