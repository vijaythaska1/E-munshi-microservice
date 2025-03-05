import config from './config';
import logger from './logger';
import morgan from 'morgan';
import { Request, Response } from 'express';

morgan.token('message', (_: Request, res: Response): string => {
  return (res.locals.errorMessage as string) || '';
});

const getIpFormat = (): string =>
  config.env === 'production' ? ':remote-addr - ' : '';
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (_: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

export { successHandler, errorHandler };
