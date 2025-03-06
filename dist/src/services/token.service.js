"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(e, t) {
    for(var r in t)Object.defineProperty(e, r, {
        enumerable: !0,
        get: t[r]
    });
}(exports, {
    generateAuthTokens: function() {
        return w;
    },
    generateResetPasswordToken: function() {
        return p;
    },
    generateToken: function() {
        return d;
    },
    generateVerifyEmailToken: function() {
        return E;
    },
    removeToken: function() {
        return y;
    },
    saveToken: function() {
        return _;
    },
    verifyToken: function() {
        return c;
    }
});
const e = /*#__PURE__*/ s(require("http-status")), t = /*#__PURE__*/ s(require("jsonwebtoken")), r = /*#__PURE__*/ o(require("moment")), n = /*#__PURE__*/ o(require("../config/config")), u = /*#__PURE__*/ o(require("../models/token_model/token.model")), i = /*#__PURE__*/ o(require("../utils/ApiError")), a = /*#__PURE__*/ s(require("./user.service"));
function o(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
function f(e) {
    if ("function" != typeof WeakMap) return null;
    var t = new WeakMap(), r = new WeakMap();
    return (f = function(e) {
        return e ? r : t;
    })(e);
}
function s(e, t) {
    if (!t && e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
    };
    var r = f(t);
    if (r && r.has(e)) return r.get(e);
    var n = {
        __proto__: null
    }, u = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var i in e)if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
        var a = u ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(n, i, a) : n[i] = e[i];
    }
    return n.default = e, r && r.set(e, n), n;
}
const { tokenTypes: l } = require('../config/tokens'), d = (e, u, i = n.default.jwt.secret)=>{
    let a = {
        sub: e,
        iat: (0, r.default)().unix(),
        type: u
    };
    return t.sign(a, i);
}, _ = async (e, t, r, n, i = !1)=>await u.default.create({
        token: e,
        user: t,
        expires: r,
        type: n,
        blacklisted: i
    }), c = async (e, r)=>{
    let i = t.verify(e, n.default.jwt.secret);
    if (!i.sub) throw Error('Invalid token payload');
    let a = await u.default.findOne({
        token: e,
        type: r,
        user: i.sub,
        blacklisted: !1
    });
    if (!a) throw Error('Token not found');
    return a;
}, w = async (e)=>{
    let t = d(e._id.toString(), l.ACCESS), u = (0, r.default)().add(n.default.jwt.accessExpirationMinutes, 'minutes').toDate();
    return await _(t, e._id, u, l.ACCESS), {
        accessToken: t
    };
}, p = async (t)=>{
    let u = await a.getUserByEmail(t);
    if (!u) throw new i.default(e.NOT_FOUND, 'No users found with this email');
    let o = (0, r.default)().add(n.default.jwt.resetPasswordExpirationMinutes, 'minutes'), f = d(u.id, l.RESET_PASSWORD, n.default.jwt.secret);
    return await _(f, u.id, o.toDate(), l.RESET_PASSWORD), f;
}, E = async (e)=>{
    let t = (0, r.default)().add(n.default.jwt.verifyEmailExpirationMinutes, 'minutes'), u = d(e.id, l.VERIFY_EMAIL, n.default.jwt.secret);
    return await _(u, e.id, t.toDate(), l.VERIFY_EMAIL), u;
}, y = async (e)=>await u.default.findOneAndDelete({
        user: e._id
    });
