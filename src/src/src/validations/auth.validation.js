import * as e from 'joi';
let { password: r } = require('./custom.validation'),
  s = {
    body: e.object().keys({
      name: e.string().required(),
      userName: e.string().required(),
      password: e.string().required(),
      email: e.string().required().email(),
      age: e.number().required(),
    }),
  },
  i = {
    body: e.object().keys({
      password: e.string().required(),
      email: e.string().required().email(),
    }),
  },
  o = {
    body: e.object().keys({
      refreshToken: e.string().required(),
    }),
  },
  t = {
    body: e.object().keys({
      refreshToken: e.string().required(),
    }),
  },
  d = {
    body: e.object().keys({
      email: e.string().email().required(),
      code: e.string().length(4).required(),
    }),
  },
  a = {
    body: e.object().keys({
      email: e.string().required().email(),
      password: e.string().required().custom(r),
    }),
  },
  n = {
    query: e.object().keys({
      token: e.string().required(),
    }),
  };
export {
  s as register,
  i as login,
  o as logout,
  t as refreshTokens,
  d as forgotPassword,
  a as resetPassword,
  n as verifyEmail,
};
