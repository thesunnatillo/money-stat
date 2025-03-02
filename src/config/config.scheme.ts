import * as Joi from "joi"

export const configScheme = Joi.object({

    // DB
    DB_TYPE: Joi.string(),
    DB_CONNECTION_URL: Joi.string(),

})