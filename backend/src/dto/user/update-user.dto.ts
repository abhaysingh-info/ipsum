import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsMongoId,
  IsDefined,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdatePaymentDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsIn(['pending', 'verified', 'rejected'])
  payment_status: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId: string;

  constructor() {
    console.log(this);
  }
}
