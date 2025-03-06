"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return _;
    }
});
const e = /*#__PURE__*/ i(require("dotenv")), r = /*#__PURE__*/ i(require("path")), t = /*#__PURE__*/ i(require("joi"));
function i(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
e.default.config({
    path: r.default.join(__dirname, '../../.env')
});
const { value: n, error: s } = t.default.object().keys({
    NODE_ENV: t.default.string().valid('production', 'development', 'test').required(),
    PORT: t.default.number().default(3000),
    MONGODB_URL: t.default.string().required().description('Mongo DB url'),
    DB_NAME: t.default.string().required().description('DB Name'),
    JWT_SECRET: t.default.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: t.default.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: t.default.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: t.default.number().default(10).description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: t.default.number().default(10)
}).unknown().prefs({
    errors: {
        label: 'key'
    }
}).validate(process.env);
if (s) throw Error(`Config validation error: ${s.message}`);
const _ = {
    env: n.NODE_ENV,
    port: n.PORT,
    mongoose: {
        url: n.MONGODB_URL,
        options: {
            dbName: n.DB_NAME,
            useCreateIndex: !0,
            useNewUrlParser: !0,
            useUnifiedTopology: !0
        }
    },
    jwt: {
        secret: n.JWT_SECRET,
        accessExpirationMinutes: n.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: n.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: n.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: n.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    }
};
