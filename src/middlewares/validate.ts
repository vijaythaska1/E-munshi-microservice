import ApiError from '../utils/ApiError';
import pick from '../utils/pick';

import httpStatus from 'http-status';
import Joi from 'joi';

interface Schema {
  params?: Joi.Schema;
  query?: Joi.Schema;
  body?: Joi.Schema;
}

interface RequestObject {
  params?: any;
  query?: any;
  body?: any;
}

const validate =
  (schema: Schema) => (req: RequestObject, next: (err?: any) => void) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details: Joi.ValidationErrorItem) => details.message)
        .join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
