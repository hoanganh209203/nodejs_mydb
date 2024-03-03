import Joi from "joi";

export const categoryVali = Joi.object({
    name: Joi.string().required().min(3),
    slug: Joi.string().required().min(3),
})