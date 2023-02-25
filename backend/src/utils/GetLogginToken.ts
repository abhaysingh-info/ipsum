import { Request } from 'express';
import { User, UserDocument } from 'src/entities/user.entity';

export default function (req: Request): string | null {
  const token: string | null =
    (req.cookies.token as string) || (req.body.token as string) || null;

  return token;
}
