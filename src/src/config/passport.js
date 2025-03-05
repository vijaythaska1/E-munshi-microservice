import r from '../models/user_model/user.model';
import t from './config';
import { tokenTypes as e } from './tokens';
import { Strategy as o, ExtractJwt as m } from 'passport-jwt';
let s = new o(
  {
    secretOrKey: t.jwt.secret,
    jwtFromRequest: m.fromAuthHeaderAsBearerToken(),
  },
  async (t, o) => {
    try {
      if (t.type !== e.ACCESS) throw Error('Invalid token type');
      let m = await r.findById(t.sub);
      if (!m) return o(null, !1);
      o(null, m);
    } catch (r) {
      o(r, !1);
    }
  }
);
export { s as jwtStrategy };
