import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { eventType, requirementFieldType } from 'src/utils/event';
import { IrequirementFieldType } from '../../../@shared/interface/event';

@Schema({ _id: false })
class EventRequirementField {
  @Prop({ required: true, type: String })
  question: string;

  @Prop({ required: true, type: String, enum: requirementFieldType })
  requirementFieldType: IrequirementFieldType;
}

const EventRequirementFieldSchema = SchemaFactory.createForClass(
  EventRequirementField,
);

@Schema()
export class Event extends Document {
  @Prop({
    required: true,
    type: String,
    default: 'default.jpg',
  })
  image: string;

  @Prop({ required: true, unique: true, type: String })
  eventId: string;

  @Prop({ required: true, enum: eventType, type: String })
  eventType: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Date })
  commencementDate: Date;

  @Prop({ required: true, maxlength: 256, type: String })
  venue: string;

  @Prop({ required: true, type: Date })
  registrationClosesOn: Date;

  @Prop({ required: true, type: String, maxlength: 2500 })
  description: string;

  @Prop({ required: true })
  eventBatch: number;

  @Prop({ required: true, type: String })
  moreInformationPdf: string;

  @Prop({ required: true, type: [EventRequirementFieldSchema] })
  eventRequirementField: (typeof EventRequirementField)[];

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
export type EventDocument = HydratedDocument<Event>;

@Schema()
export class EventRegistrationExtention extends Document {
  @Prop({ required: true, type: String })
  eventId: string;

  @Prop({ required: true, enum: eventType, type: String })
  eventType: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true })
  eventBatch: number;
}

export const EventRegistrationExtentionSchema = SchemaFactory.createForClass(
  EventRegistrationExtention,
);
export type EventRegistrationExtentionDocument =
  HydratedDocument<EventRegistrationExtention>;
