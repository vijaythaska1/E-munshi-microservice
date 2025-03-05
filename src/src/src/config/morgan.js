import e from './config';
import r from './logger';
import s from 'morgan';
s.token('message', (e, r) => r.locals.errorMessage || '');
let t = () => ('production' === e.env ? ':remote-addr - ' : ''),
  o = `${t()}:method :url :status - :response-time ms`,
  m = `${t()}:method :url :status - :response-time ms - message: :message`,
  a = s(o, {
    skip: (e, r) => r.statusCode >= 400,
    stream: {
      write: (e) => r.info(e.trim()),
    },
  }),
  i = s(m, {
    skip: (e, r) => r.statusCode < 400,
    stream: {
      write: (e) => r.error(e.trim()),
    },
  });
export { a as successHandler, i as errorHandler };
