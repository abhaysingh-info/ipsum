import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';
import { SchemaTypes, Document, HydratedDocument } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  userId: typeof SchemaTypes.ObjectId;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ required: true, type: Boolean, default: false })
  isRead: boolean;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
export type NotificationDocument = HydratedDocument<Notification>;
