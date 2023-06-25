const Joi = require("joi");

module.exports.dealershipSchema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),

  deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
  }).required(),

module.exports.userSchema = Joi.object({
    email: Joi.string().required(),
    username: Joi.string().required(),
    password : Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .min(8)
    .required()
  }).required()
