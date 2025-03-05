import * as e from 'http-status';
import * as t from 'jsonwebtoken';
import r from 'moment';
import i from '../config/config';
import o from '../models/token_model/token.model';
import n from '../utils/ApiError';
import * as a from './user.service';
let { tokenTypes: s } = require('../config/tokens'),
  m = (e, o, n = i.jwt.secret) => {
    let a = {
      sub: e,
      iat: r().unix(),
      type: o,
    };
    return t.sign(a, n);
  },
  d = async (e, t, r, i, n = !1) =>
    await o.create({
      token: e,
      user: t,
      expires: r,
      type: i,
      blacklisted: n,
    }),
  u = async (e, r) => {
    let n = t.verify(e, i.jwt.secret);
    if (!n.sub) throw Error('Invalid token payload');
    let a = await o.findOne({
      token: e,
      type: r,
      user: n.sub,
      blacklisted: !1,
    });
    if (!a) throw Error('Token not found');
    return a;
  },
  w = async (e) => {
    let t = m(e._id.toString(), s.ACCESS),
      o = r().add(i.jwt.accessExpirationMinutes, 'minutes').toDate();
    return (
      await d(t, e._id, o, s.ACCESS),
      {
        accessToken: t,
      }
    );
  },
  f = async (t) => {
    let o = await a.getUserByEmail(t);
    if (!o) throw new n(e.NOT_FOUND, 'No users found with this email');
    let u = r().add(i.jwt.resetPasswordExpirationMinutes, 'minutes'),
      w = m(o.id, s.RESET_PASSWORD, i.jwt.secret);
    return await d(w, o.id, u.toDate(), s.RESET_PASSWORD), w;
  },
  l = async (e) => {
    let t = r().add(i.jwt.verifyEmailExpirationMinutes, 'minutes'),
      o = m(e.id, s.VERIFY_EMAIL, i.jwt.secret);
    return await d(o, e.id, t.toDate(), s.VERIFY_EMAIL), o;
  },
  E = async (e) =>
    await o.findOneAndDelete({
      user: e._id,
    });
export {
  m as generateToken,
  d as saveToken,
  u as verifyToken,
  E as removeToken,
  w as generateAuthTokens,
  f as generateResetPasswordToken,
  l as generateVerifyEmailToken,
};
