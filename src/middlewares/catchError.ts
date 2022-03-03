import { NextFunction, Request, Response } from 'express';
import AppError from '../error/AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function catchError(error: AppError | Error, req: Request, res: Response, _: NextFunction) {
	if (error instanceof AppError) {
		return res.status(error.statusCode).send({
			status: error.statusCode,
			message: error.message
		});
	}

	return res.status(500).send({
		message: error.message
	});
}

export { catchError };