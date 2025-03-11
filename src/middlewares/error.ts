import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../config/config';
import logger from '../config/logger';
import ApiError from '../utils/ApiError';
import { error } from '../utils/responseManager';

const errorConverter = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let convertedError = err;

  if (!(convertedError instanceof ApiError)) {
    const statusCode =
      'statusCode' in convertedError
        ? (convertedError as any).statusCode
        : convertedError instanceof mongoose.Error
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;

    const message = convertedError.message || httpStatus[statusCode];
    convertedError = new ApiError(statusCode, message, false, err.stack);
  }

  next(convertedError);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }
  return error(res, statusCode, response?.message);
};

export { errorConverter, errorHandler };
