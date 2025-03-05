import t from '../models/user_model/user.model';
import e from './config';
import { tokenTypes as r } from './tokens';
import { Strategy as o, ExtractJwt as s } from 'passport-jwt';
let a = new o(
  {
    secretOrKey: e.jwt.secret,
    jwtFromRequest: s.fromAuthHeaderAsBearerToken(),
  },
  async (e, o) => {
    try {
      if (e.type !== r.ACCESS) throw Error('Invalid token type');
      let s = await t.findById(e.sub);
      if (!s) return o(null, !1);
      o(null, s);
    } catch (t) {
      o(t, !1);
    }
  }
);
export { a as jwtStrategy };
