import e from 'dotenv';
import r from 'path';
import i from 'joi';
e.config({
  path: r.join(__dirname, '../../.env'),
});
let { value: t, error: o } = i
  .object()
  .keys({
    NODE_ENV: i.string().valid('production', 'development', 'test').required(),
    PORT: i.number().default(3000),
    MONGODB_URL: i.string().required().description('Mongo DB url'),
    DB_NAME: i.string().required().description('DB Name'),
    JWT_SECRET: i.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: i
      .number()
      .default(30)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: i
      .number()
      .default(30)
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: i
      .number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: i.number().default(10),
  })
  .unknown()
  .prefs({
    errors: {
      label: 'key',
    },
  })
  .validate(process.env);
if (o) throw Error(`Config validation error: ${o.message}`);
let s = {
  env: t.NODE_ENV,
  port: t.PORT,
  mongoose: {
    url: t.MONGODB_URL,
    options: {
      dbName: t.DB_NAME,
      useCreateIndex: !0,
      useNewUrlParser: !0,
      useUnifiedTopology: !0,
    },
  },
  jwt: {
    secret: t.JWT_SECRET,
    accessExpirationMinutes: t.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: t.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: t.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: t.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};
export default s;
