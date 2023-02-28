import { IrequirementFieldType } from '@shared/interfaces/event';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
  MaxLength,
  IsDefined,
  IsUrl,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';
import { requirementFieldType } from '../../utils/event';

export const eventType = ['individual', 'team'] as const;
export type EventType = (typeof eventType)[number];

class EventRequirementFieldDto {
  @IsString()
  @MaxLength(512)
  question: string;

  @IsString()
  @IsEnum(requirementFieldType)
  requirementFieldType: IrequirementFieldType;
}

export class CreateEventDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  eventId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(eventType)
  @Transform(({ value }) => value.toLowerCase())
  eventType: EventType;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDateString()
  commencementDate: Date;

  @IsDefined()
  @IsNotEmpty()
  @MaxLength(256)
  @IsString()
  venue: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDateString()
  registrationClosesOn: Date;

  @IsDefined()
  @IsNotEmpty()
  @MaxLength(2500)
  @IsString()
  description: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  eventBatch: number;

  @IsDefined()
  @IsNotEmpty()
  @IsUrl()
  moreInformationPdf: string;

  @IsDefined()
  @IsArray()
  @ArrayMaxSize(5)
  eventRequirementField: EventRequirementFieldDto[];
}
