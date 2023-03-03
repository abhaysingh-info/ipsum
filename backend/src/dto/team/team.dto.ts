import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMaxSize,
  IsEmail,
  IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsRegxMatch } from 'src/utils/custom-validators';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  @IsRegxMatch(/^[a-zA-Z0-9]+$/)
  @Transform((value) => {
    console.log(value);
    return value ? value.value.toLowerCase() : value;
  })
  teamID: string;

  @IsNotEmpty()
  @IsString()
  @IsRegxMatch(/^[a-zA-Z0-9 ]+$/)
  teamName: string;
}
