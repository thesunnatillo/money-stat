import * as bcrypt from 'bcryptjs';

import { HttpResponse } from './response';
import { MyError } from './errors';

export function setResult(errorId: number, data: any): HttpResponse {
  if (!errorId) {
    return {
      error: null,
      data: data,
      success: true,
    };
  }

  const { errId, errMsg, isFriendly } = MyError.getErrorByErrId(errorId);

  return {
    data: null,
    error: {
      errId,
      isFriendly,
      errMsg: data ?? errMsg,
    },
    success: isFriendly,
  };
}

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function isPasswordValid(
  password: string,
  hashPassword: string,
): boolean {
  return bcrypt.compareSync(password, hashPassword);
}
