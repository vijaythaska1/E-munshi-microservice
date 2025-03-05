import e from '../config/config';
import o from '../config/logger';
import r from '../utils/ApiError';
import t from 'mongoose';
import s from 'http-status';
let a = (e, o, a, n) => {
    let R = e;
    if ((console.log(o, a), !(R instanceof r))) {
      let o =
          R.statusCode || R instanceof t.Error
            ? s.BAD_REQUEST
            : s.INTERNAL_SERVER_ERROR,
        a = R.message || s[o];
      R = new r(o, a, !1, e.stack);
    }
    n(R);
  },
  n = (r, t) => {
    let { statusCode: a, message: n } = r;
    'production' !== e.env ||
      r.isOperational ||
      ((a = s.INTERNAL_SERVER_ERROR), (n = s[s.INTERNAL_SERVER_ERROR])),
      (t.locals.errorMessage = r.message);
    let R = {
      code: a,
      message: n,
      ...('development' === e.env && {
        stack: r.stack,
      }),
    };
    'development' === e.env && o.error(r), t.status(a).send(R);
  };
export { a as errorConverter, n as errorHandler };
