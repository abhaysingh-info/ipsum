import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export default async function (next: Function) {
  try {
    return await next();
  } catch (error) {
    const userDefinedErrors = Object.keys(error?.errors || {});
    if (userDefinedErrors.length) {
      if (
        error?.errors[userDefinedErrors[0]]?.kind === 'user defined' ||
        error.message.startsWith('User validation failed')
      ) {
        throw new BadRequestException(
          error?.errors[userDefinedErrors[0]]?.message,
        );
      }
    }

    if (error.status) {
      throw error;
    }
    console.log(error)
    throw new InternalServerErrorException('There was an error');
  }
}
