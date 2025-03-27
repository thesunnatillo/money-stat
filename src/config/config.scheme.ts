import * as Joi from 'joi';

export const configScheme = Joi.object({
  // DB
  DB_TYPE: Joi.string(),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number(),
  DB_USER: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_NAME: Joi.string(),

  // JWT
  JWT_SECRET: Joi.string(),
  JWT_ACCESS_EXPIRES: Joi.string(),
  JWT_REFRESH_EXPIRES: Joi.string()
  
});
