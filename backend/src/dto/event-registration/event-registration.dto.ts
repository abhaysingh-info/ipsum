import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
  ValidateIf,
} from 'class-validator';import { eventType } from '@shared/interfaces/event';
import { isValidObjectId } from 'mongoose';


export class CreateEventRegistrationDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  eventIsIndividual: eventType;

  @ValidateIf((o) => o.eventIsIndividual === 'team' && isValidObjectId(o.teamId))
  @IsString()
  teamId: string;

  @ValidateIf((o) => o.eventIsIndividual === 'individual')
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  score: number;

  @MaxLength(1500)
  notes: string;
}
