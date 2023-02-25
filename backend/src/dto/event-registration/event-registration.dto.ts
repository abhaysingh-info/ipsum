import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateEventRegistrationDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  teamId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  score: number;

  @IsString()
  @MaxLength(1500)
  notes?: string;
}
