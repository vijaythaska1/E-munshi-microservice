import User from '../models/user_model/user.model';
import config from './config';
import { tokenTypes } from './tokens';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from 'passport-jwt';

interface JwtPayload {
  sub: string;
  type: string;
}

const jwtOptions: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: JwtPayload, done: VerifiedCallback) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
