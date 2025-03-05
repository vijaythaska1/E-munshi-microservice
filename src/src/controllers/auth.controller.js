import s from 'http-status';
import e from '../utils/catchAsync';
import { createUser as t, getUserByEmail as a } from '../services/user.service';
import {
  generateAuthTokens as r,
  removeToken as i,
} from '../services/token.service';
let c = e(async (e, a) => {
    let i = await t(e.body),
      c = await r(i);
    a.status(s.OK).send({
      message: 'user created successfully',
      user: i,
      token: c,
    });
  }),
  o = e(async (e, t) => {
    let { email: i, password: c } = e.body,
      o = await a(i);
    if (!o || !(await o.isPasswordMatch(c))) {
      t.status(s.UNAUTHORIZED).send({
        message: 'Invalid credentials',
      });
      return;
    }
    let u = await r(o);
    t.status(s.OK).send({
      message: 'login successful',
      user: o,
      token: u,
    });
  }),
  u = e(async (e, t) => {
    let a = e.user;
    await i(a),
      t.status(s.OK).send({
        message: 'logout successful',
        status: !0,
      });
  });
export { c as register, o as login, u as logout };
