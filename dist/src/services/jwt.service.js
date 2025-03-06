"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const e = /*#__PURE__*/ s(require("jsonwebtoken")), t = /*#__PURE__*/ s(require("moment")), r = /*#__PURE__*/ s(require("../utils/ApiError")), i = /*#__PURE__*/ s(require("http-status"));
function s(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const u = require('./user.service'), n = require('../config/config'), { Token: a } = require('../models'), { tokenTypes: d } = require('../config/tokens'), o = ({ userId: r, type: i, secret: s = n.jwt.secret })=>{
    let u = {
        sub: r,
        iat: (0, t.default)().unix(),
        type: i
    };
    return e.default.sign(u, s);
}, l = async ({ token: e, userId: t, type: r, blacklisted: i = !1 })=>await a.create({
        token: e,
        user: t,
        type: r,
        blacklisted: i
    }), _ = async ({ token: t, type: r })=>{
    let i = e.default.verify(t, n.jwt.secret), s = await a.findOne({
        token: t,
        type: r,
        user: i.sub,
        blacklisted: !1
    });
    if (!s) throw Error('Token not found');
    return s;
}, c = async ({ user: e })=>{
    let t = o({
        userId: e._id,
        type: d.ACCESS
    });
    return await l({
        token: t,
        userId: e._id,
        type: d.ACCESS
    }), t;
}, f = async (e)=>{
    let s = await u.getUserByEmail(e);
    if (!s) throw new r.default(i.default.NOT_FOUND, 'No users found with this email');
    (0, t.default)().add(n.jwt.resetPasswordExpirationMinutes, 'minutes');
    let a = o({
        userId: s.id,
        type: d.RESET_PASSWORD,
        secret: n.jwt.secret
    });
    return await l({
        token: a,
        userId: s.id,
        type: d.RESET_PASSWORD,
        blacklisted: !1
    }), a;
}, E = async ({ user: e })=>{
    (0, t.default)().add(n.jwt.verifyEmailExpirationMinutes, 'minutes');
    let r = o({
        userId: e.id,
        type: d.VERIFY_EMAIL,
        secret: n.jwt.secret
    });
    return await l({
        token: r,
        userId: e.id,
        type: d.VERIFY_EMAIL,
        blacklisted: !1
    }), r;
}, w = async (e)=>await a.findOneAndDelete({
        user: e.id
    });
module.exports = {
    generateToken: o,
    saveToken: l,
    verifyToken: _,
    removeToken: w,
    generateAuthTokens: c,
    generateResetPasswordToken: f,
    generateVerifyEmailToken: E
};
