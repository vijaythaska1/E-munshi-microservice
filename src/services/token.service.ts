import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import { ObjectId } from 'mongoose';
import config from '../config/config';
import { tokenTypes } from '../config/tokens';
import { IToken, IUser, Token } from '../models/index';
import ApiError from '../utils/ApiError';
import * as userService from './user.service';

interface GenerateTokenPayload {
  sub: string;
  iat: number;
  type: string;
}

/**
 * Generate token
 * @param {string} userId
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId: string,
  type: string,
  secret: string = config.jwt.secret
): string => {
  const payload: GenerateTokenPayload = {
    sub: userId,
    iat: moment().unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Date} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
  token: string,
  userId: ObjectId,
  expires: Date,
  type: string,
  blacklisted: boolean = false
): Promise<IToken> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires,
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: string): Promise<IToken> => {
  const payload = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;
  if (!payload.sub) {
    throw new Error('Invalid token payload');
  }

  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });

  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (
  user: IUser
): Promise<{ accessToken: string }> => {
  const accessToken = generateToken(user._id.toString(), tokenTypes.ACCESS);
  const expires = moment()
    .add(config.jwt.accessExpirationMinutes, 'minutes')
    .toDate();
  await saveToken(accessToken, user._id, expires, tokenTypes.ACCESS);
  return { accessToken };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes'
  );
  const resetPasswordToken = generateToken(
    user.id,
    tokenTypes.RESET_PASSWORD,
    config.jwt.secret
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires.toDate(),
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {IUser} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user: IUser): Promise<string> => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    'minutes'
  );
  const verifyEmailToken = generateToken(
    user.id,
    tokenTypes.VERIFY_EMAIL,
    config.jwt.secret
  );
  await saveToken(
    verifyEmailToken,
    user.id,
    expires.toDate(),
    tokenTypes.VERIFY_EMAIL
  );
  return verifyEmailToken;
};

/**
 * Remove token for a user
 * @param {IUser} user
 * @returns {Promise<IToken | null>}
 */
const removeToken = async (user: IUser): Promise<IToken | null> => {
  const res = await Token.findOneAndDelete({ user: user._id });
  return res;
};

export {
  generateAuthTokens,
  generateResetPasswordToken,
  generateToken,
  generateVerifyEmailToken,
  removeToken,
  saveToken,
  verifyToken,
};
