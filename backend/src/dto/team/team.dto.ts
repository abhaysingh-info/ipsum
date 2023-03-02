import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMaxSize,
  IsEmail,
  IsMongoId,
} from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  teamID: string;

  @IsNotEmpty()
  @IsString()
  teamName: string;
}
