import config from '../config/config';
import logger from '../config/logger';
import ApiError from '../utils/ApiError';

import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err;
  console.log(req, res);

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || (httpStatus[statusCode] as string);
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, res: Response): void => {
  let { statusCode, message } = err;

  // console.log("🚀 ~ file: error.ts:24 ~ errorHandler ~ message:", message);
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string;
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

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
