import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
  ValidateIf,
  ArrayMaxSize,
  IsArray,
  IsDefined,
} from 'class-validator';

class EventRequirementFieldDto {
  @IsString()
  @MaxLength(512)
  question: string;

  @IsString()
  answer: string;
}

export class CreateEventRegistrationDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsDefined()
  @IsArray()
  @ArrayMaxSize(5)
  eventRequirementField: EventRequirementFieldDto[];
}
