import Joi from 'joi';

const todoSchema = Joi.object({
	title: Joi.string().max(45).required().messages({
		'string.max': 'title should be less than 45 characters',
		'string.empty': 'Title and description are required',
	}),
	description: Joi.string()
		.max(150)
		.message('description should be less than 150 characters')
		.required()
		.messages({
			'string.max': 'description should be less than 150 characters',
			'string.empty': 'Title and description are required',
		}),
	completed: Joi.boolean().optional(),
});

export { todoSchema };
