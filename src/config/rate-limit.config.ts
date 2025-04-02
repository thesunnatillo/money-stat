import { registerAs } from '@nestjs/config';

export default registerAs('rateLimit', () => ({
  ttl: process.env['RL_TIME'],
  limit: process.env['RL_LIMIT'],
}));
