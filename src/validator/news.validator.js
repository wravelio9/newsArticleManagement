import Joi from "joi";

export const createNewsSchema =
Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    content: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required(),

    author: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    thumbnail: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required(),
    
    published: Joi.bool()
        .required()

    // quantity: Joi.number()
    //     .integer()
    //     .min(0)
    //     .required()
    //     .strict(),
})  