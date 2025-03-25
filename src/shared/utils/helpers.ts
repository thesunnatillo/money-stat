import * as bcrypt from 'bcryptjs';

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
