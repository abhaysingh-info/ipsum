import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  IsDateString,
  IsNumber,
  MaxLength,
  IsDefined,
  IsUrl,
} from 'class-validator';

export const eventType = ['individual', 'team'] as const;
export type EventType = (typeof eventType)[number];

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
}
