import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

export default registerAs('database', () => ({
  type: process.env['DB_TYPE'],
  host: process.env['DB_HOST'],
  port: process.env['DB_PORT'],
  user: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  name: process.env['DB_NAME'],
}));
