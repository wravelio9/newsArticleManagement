import Joi from "joi";

export const createUserSchema =
Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    email: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required(),

    password: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    dateOfBirth: Joi.date()
        .required(),
})  