import r from '../utils/ApiError';
import e from '../utils/pick';
import t from 'joi';
import o from 'http-status';
export default (i) => (a, s) => {
  let l = e(i, ['params', 'query', 'body']),
    m = e(a, Object.keys(l)),
    { value: p, error: u } = t
      .compile(l)
      .prefs({
        errors: {
          label: 'key',
        },
        abortEarly: !1,
      })
      .validate(m);
  if (u) {
    let e = u.details.map((r) => r.message).join(', ');
    return s(new r(o.BAD_REQUEST, e));
  }
  return Object.assign(a, p), s();
};
