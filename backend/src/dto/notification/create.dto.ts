import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNotification {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  message: string;
}
