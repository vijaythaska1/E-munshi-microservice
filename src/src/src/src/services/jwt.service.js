import e from 'jsonwebtoken';
import t from 'moment';
import r from '../utils/ApiError';
import s from 'http-status';
let i = require('./user.service'),
  n = require('../config/config'),
  { Token: o } = require('../models'),
  { tokenTypes: a } = require('../config/tokens'),
  u = ({ userId: r, type: s, secret: i = n.jwt.secret }) => {
    let o = {
      sub: r,
      iat: t().unix(),
      type: s,
    };
    return e.sign(o, i);
  },
  d = async ({ token: e, userId: t, type: r, blacklisted: s = !1 }) =>
    await o.create({
      token: e,
      user: t,
      type: r,
      blacklisted: s,
    }),
  l = async ({ token: t, type: r }) => {
    let s = e.verify(t, n.jwt.secret),
      i = await o.findOne({
        token: t,
        type: r,
        user: s.sub,
        blacklisted: !1,
      });
    if (!i) throw Error('Token not found');
    return i;
  },
  k = async ({ user: e }) => {
    let t = u({
      userId: e._id,
      type: a.ACCESS,
    });
    return (
      await d({
        token: t,
        userId: e._id,
        type: a.ACCESS,
      }),
      t
    );
  },
  y = async (e) => {
    let o = await i.getUserByEmail(e);
    if (!o) throw new r(s.NOT_FOUND, 'No users found with this email');
    t().add(n.jwt.resetPasswordExpirationMinutes, 'minutes');
    let l = u({
      userId: o.id,
      type: a.RESET_PASSWORD,
      secret: n.jwt.secret,
    });
    return (
      await d({
        token: l,
        userId: o.id,
        type: a.RESET_PASSWORD,
        blacklisted: !1,
      }),
      l
    );
  },
  c = async ({ user: e }) => {
    t().add(n.jwt.verifyEmailExpirationMinutes, 'minutes');
    let r = u({
      userId: e.id,
      type: a.VERIFY_EMAIL,
      secret: n.jwt.secret,
    });
    return (
      await d({
        token: r,
        userId: e.id,
        type: a.VERIFY_EMAIL,
        blacklisted: !1,
      }),
      r
    );
  },
  p = async (e) =>
    await o.findOneAndDelete({
      user: e.id,
    });
module.exports = {
  generateToken: u,
  saveToken: d,
  verifyToken: l,
  removeToken: p,
  generateAuthTokens: k,
  generateResetPasswordToken: y,
  generateVerifyEmailToken: c,
};
