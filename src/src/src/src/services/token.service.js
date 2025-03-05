import * as e from 'http-status';
import * as t from 'jsonwebtoken';
import r from 'moment';
import i from '../config/config';
import o from '../models/token_model/token.model';
import s from '../utils/ApiError';
import * as a from './user.service';
let { tokenTypes: n } = require('../config/tokens'),
  d = (e, o, s = i.jwt.secret) => {
    let a = {
      sub: e,
      iat: r().unix(),
      type: o,
    };
    return t.sign(a, s);
  },
  m = async (e, t, r, i, s = !1) =>
    await o.create({
      token: e,
      user: t,
      expires: r,
      type: i,
      blacklisted: s,
    }),
  u = async (e, r) => {
    let s = t.verify(e, i.jwt.secret);
    if (!s.sub) throw Error('Invalid token payload');
    let a = await o.findOne({
      token: e,
      type: r,
      user: s.sub,
      blacklisted: !1,
    });
    if (!a) throw Error('Token not found');
    return a;
  },
  l = async (e) => {
    let t = d(e._id.toString(), n.ACCESS),
      o = r().add(i.jwt.accessExpirationMinutes, 'minutes').toDate();
    return (
      await m(t, e._id, o, n.ACCESS),
      {
        accessToken: t,
      }
    );
  },
  w = async (t) => {
    let o = await a.getUserByEmail(t);
    if (!o) throw new s(e.NOT_FOUND, 'No users found with this email');
    let u = r().add(i.jwt.resetPasswordExpirationMinutes, 'minutes'),
      l = d(o.id, n.RESET_PASSWORD, i.jwt.secret);
    return await m(l, o.id, u.toDate(), n.RESET_PASSWORD), l;
  },
  c = async (e) => {
    let t = r().add(i.jwt.verifyEmailExpirationMinutes, 'minutes'),
      o = d(e.id, n.VERIFY_EMAIL, i.jwt.secret);
    return await m(o, e.id, t.toDate(), n.VERIFY_EMAIL), o;
  },
  f = async (e) =>
    await o.findOneAndDelete({
      user: e._id,
    });
export {
  d as generateToken,
  m as saveToken,
  u as verifyToken,
  f as removeToken,
  l as generateAuthTokens,
  w as generateResetPasswordToken,
  c as generateVerifyEmailToken,
};
