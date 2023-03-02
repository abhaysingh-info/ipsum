import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class AcceptJoinRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  request_id: string;

  @IsNotEmpty()
  @IsBoolean()
  accept: boolean;
}
