import e from '../config/config';
import o from '../config/logger';
import r from '../utils/ApiError';
import t from 'mongoose';
import s from 'http-status';
let n = (e, o, n, a) => {
    let R = e;
    if ((console.log(o, n), !(R instanceof r))) {
      let o =
          R.statusCode || R instanceof t.Error
            ? s.BAD_REQUEST
            : s.INTERNAL_SERVER_ERROR,
        n = R.message || s[o];
      R = new r(o, n, !1, e.stack);
    }
    a(R);
  },
  a = (r, t) => {
    let { statusCode: n, message: a } = r;
    'production' !== e.env ||
      r.isOperational ||
      ((n = s.INTERNAL_SERVER_ERROR), (a = s[s.INTERNAL_SERVER_ERROR])),
      (t.locals.errorMessage = r.message);
    let R = {
      code: n,
      message: a,
      ...('development' === e.env && {
        stack: r.stack,
      }),
    };
    'development' === e.env && o.error(r), t.status(n).send(R);
  };
export { n as errorConverter, a as errorHandler };
