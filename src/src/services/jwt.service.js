import e from "jsonwebtoken";
import t from "moment";
import r from "../utils/ApiError";
import i from "http-status";
let s = require("./user.service"), n = require("../config/config"), { Token: a } = require("../models"), { tokenTypes: o } = require("../config/tokens"), u = ({ userId: r, type: i, secret: s = n.jwt.secret })=>{
    let a = {
        sub: r,
        iat: t().unix(),
        type: i
    };
    return e.sign(a, s);
}, d = async ({ token: e, userId: t, type: r, blacklisted: i = !1 })=>await a.create({
        token: e,
        user: t,
        type: r,
        blacklisted: i
    }), c = async ({ token: t, type: r })=>{
    let i = e.verify(t, n.jwt.secret), s = await a.findOne({
        token: t,
        type: r,
        user: i.sub,
        blacklisted: !1
    });
    if (!s) throw Error("Token not found");
    return s;
}, l = async ({ user: e })=>{
    let t = u({
        userId: e._id,
        type: o.ACCESS
    });
    return await d({
        token: t,
        userId: e._id,
        type: o.ACCESS
    }), t;
}, w = async (e)=>{
    let a = await s.getUserByEmail(e);
    if (!a) throw new r(i.NOT_FOUND, "No users found with this email");
    t().add(n.jwt.resetPasswordExpirationMinutes, "minutes");
    let c = u({
        userId: a.id,
        type: o.RESET_PASSWORD,
        secret: n.jwt.secret
    });
    return await d({
        token: c,
        userId: a.id,
        type: o.RESET_PASSWORD,
        blacklisted: !1
    }), c;
}, m = async ({ user: e })=>{
    t().add(n.jwt.verifyEmailExpirationMinutes, "minutes");
    let r = u({
        userId: e.id,
        type: o.VERIFY_EMAIL,
        secret: n.jwt.secret
    });
    return await d({
        token: r,
        userId: e.id,
        type: o.VERIFY_EMAIL,
        blacklisted: !1
    }), r;
}, E = async (e)=>await a.findOneAndDelete({
        user: e.id
    });
module.exports = {
    generateToken: u,
    saveToken: d,
    verifyToken: c,
    removeToken: E,
    generateAuthTokens: l,
    generateResetPasswordToken: w,
    generateVerifyEmailToken: m
};
