import * as Joi from 'joi';

export const configScheme = Joi.object({
  // DB
  DB_TYPE: Joi.string(),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number(),
  DB_USER: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_NAME: Joi.string(),
});
