import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMaxSize,
  IsEmail,
} from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  teamID: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  teamName: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  teamMembersEmail: string[];
}
