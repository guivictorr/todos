import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

const validate = (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);

		if (error) {
			return res.status(422).send({
				status: 422,
				message: error.details.map(err => err.message).join(', '),
			});
		}

		next();
	};
};

export { validate };
