import { Response } from 'express';
import httpStatus from 'http-status';

interface ResponseFormat {
  statusCode: number;
  message: string;
  body: Record<string, any>;
}

const format: ResponseFormat = {
  statusCode: httpStatus.OK,
  message: 'Success',
  body: {},
};

/**
 * Send a success response
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param message - Success message
 * @param data - Response data
 */
const success = (
  res: Response,
  statusCode?: number,
  message?: string,
  data?: Record<string, any>
): void => {
  format.body = {};
  if (statusCode) format.statusCode = statusCode;
  if (message) format.message = message;
  if (data) format.body = data;
  res.status(format.statusCode).json(format);
};

/**
 * Send a failed response
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param message - Error message
 */
const failed = (res: Response, statusCode?: number, message?: string): void => {
  format.body = {};
  format.statusCode = statusCode || httpStatus.BAD_REQUEST;
  format.message = message || 'Bad request';
  res.status(format.statusCode).json(format);
};

/**
 * Send an error response
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param message - Error message
 */
const error = (res: Response, statusCode?: number, message?: string): void => {
  format.body = {};
  format.statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  format.message = message || 'Internal server error';
  res.status(format.statusCode).json(format);
};

export { error, failed, success };
