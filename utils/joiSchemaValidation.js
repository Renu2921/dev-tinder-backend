import Joi from "joi";

const userSchema=Joi.object({
firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().min(16),
  gender: Joi.string().valid("male", "female", "other"),
  imageUrl: Joi.string().uri().optional(),
  about: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()).max(10).optional()
});

export default userSchema;
