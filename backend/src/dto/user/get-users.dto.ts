// a dto with class-validator where one field is called email_or_phone of type string and can be of both type email or phone number. field 2 called as payment status that is optional and of type boolean and payment status field of type payment_status imported from @shared/interfaces/user.ts

import { payment_status as Ipayment_status } from '@shared/interfaces/user';
import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsEmail,
} from 'class-validator';
import regx from '@shared/utils/dist/regx';
import { IsRegxMatch } from 'src/utils/custom-validators';

export class GetUsersDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsRegxMatch(regx.phoneNumber)
  phone: string;

  @IsOptional()
  @IsBoolean()
  payment_made: boolean;

  @IsOptional()
  @IsString()
  @IsEnum(['pending', 'verified', 'rejected'])
  payment_status: Ipayment_status;
}
