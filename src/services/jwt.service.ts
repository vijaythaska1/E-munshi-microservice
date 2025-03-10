import jwt from 'jsonwebtoken';
import moment from 'moment';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
const userService = require('./user.service');
const config = require('../config/config');
const { Token } = require('../models');
const { tokenTypes } = require('../config/tokens');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
interface IGenerateTokenParams {
  userId: string;
  type: string;
  secret?: string;
}

const generateToken = ({
  userId,
  type,
  secret = config.jwt.secret,
}: IGenerateTokenParams): string => {
  const payload: ITokenPayload = {
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
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
interface ITokenPayload {
  sub: string;
  iat: number;
  type: string;
}

interface ISaveTokenParams {
  token: string;
  userId: string;
  type: string;
  blacklisted?: boolean;
}

const saveToken = async ({
  token,
  userId,
  type,
  blacklisted = false,
}: ISaveTokenParams): Promise<typeof Token> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
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
interface IVerifyTokenParams {
  token: string;
  type: string;
}

const verifyToken = async ({
  token,
  type,
}: IVerifyTokenParams): Promise<typeof Token> => {
  const payload = jwt.verify(token, config.jwt.secret) as ITokenPayload;
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

/**IGenerateAuthTokensParams
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
interface IGenerateAuthTokensParams {
  user: {
    _id: string;
  };
}

const generateAuthTokens = async ({
  user,
}: IGenerateAuthTokensParams): Promise<string> => {
  const accessToken = generateToken({
    userId: user._id,
    type: tokenTypes.ACCESS,
  });
  await saveToken({
    token: accessToken,
    userId: user._id,
    type: tokenTypes.ACCESS,
  });
  return accessToken;
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
  moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken({
    userId: user.id,
    type: tokenTypes.RESET_PASSWORD,
    secret: config.jwt.secret,
  });
  await saveToken({
    token: resetPasswordToken,
    userId: user.id,
    type: tokenTypes.RESET_PASSWORD,
    blacklisted: false,
  });
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
interface IGenerateVerifyEmailTokenParams {
  user: {
    id: string;
  };
}

const generateVerifyEmailToken = async ({
  user,
}: IGenerateVerifyEmailTokenParams): Promise<string> => {
  moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken({
    userId: user.id,
    type: tokenTypes.VERIFY_EMAIL,
    secret: config.jwt.secret,
  });
  await saveToken({
    token: verifyEmailToken,
    userId: user.id,
    type: tokenTypes.VERIFY_EMAIL,
    blacklisted: false,
  });
  return verifyEmailToken;
};

const removeToken = async (user: { id: any }) => {
  let res = await Token.findOneAndDelete({ user: user.id });
  return res;
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  removeToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
