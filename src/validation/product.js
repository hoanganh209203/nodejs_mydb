import Joi from "joi";

export const productValid = Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().required().min(2),
    description: Joi.string().required(),
    categoryId: Joi.string().required()
})