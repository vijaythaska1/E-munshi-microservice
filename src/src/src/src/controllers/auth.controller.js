import s from 'http-status';
import e from '../utils/catchAsync';
import { createUser as t, getUserByEmail as a } from '../services/user.service';
import {
  generateAuthTokens as r,
  removeToken as i,
} from '../services/token.service';
let o = e(async (e, a) => {
    let i = await t(e.body),
      o = await r(i);
    a.status(s.OK).send({
      message: 'user created successfully',
      user: i,
      token: o,
    });
  }),
  u = e(async (e, t) => {
    let { email: i, password: o } = e.body,
      u = await a(i);
    if (!u || !(await u.isPasswordMatch(o))) {
      t.status(s.UNAUTHORIZED).send({
        message: 'Invalid credentials',
      });
      return;
    }
    let c = await r(u);
    t.status(s.OK).send({
      message: 'login successful',
      user: u,
      token: c,
    });
  }),
  c = e(async (e, t) => {
    let a = e.user;
    await i(a),
      t.status(s.OK).send({
        message: 'logout successful',
        status: !0,
      });
  });
export { o as register, u as login, c as logout };
