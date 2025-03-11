import Joi from 'joi';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';

interface Schema {
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
}

/**
 * Validation middleware for request data
 * @param schema - Joi schema object containing validation rules for params, query and/or body
 * @returns Express middleware function
 */
const validate =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };

export default validate;
