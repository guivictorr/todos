import Joi from 'joi';

const userSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'string.email': 'Invalid email',
		'any.required': 'email is required',
		'string.empty': 'email is required',
	}),
	password: Joi.string().min(8).required().messages({
		'string.min': 'Password must be at least 8 characters',
		'any.required': 'password is required',
		'string.empty': 'password is required',
	}),
	name: Joi.string().required().messages({
		'any.required': 'name is required',
		'string.empty': 'name is required',
	}),
});

export { userSchema };
