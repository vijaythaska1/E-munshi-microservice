"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "jwtStrategy", {
    enumerable: !0,
    get: function() {
        return a;
    }
});
const e = /*#__PURE__*/ n(require("../models/user_model/user.model")), t = /*#__PURE__*/ n(require("./config")), r = require("./tokens"), u = require("passport-jwt");
function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const o = {
    secretOrKey: t.default.jwt.secret,
    jwtFromRequest: u.ExtractJwt.fromAuthHeaderAsBearerToken()
}, s = async (t, u)=>{
    try {
        if (t.type !== r.tokenTypes.ACCESS) throw Error('Invalid token type');
        let n = await e.default.findById(t.sub);
        if (!n) return u(null, !1);
        u(null, n);
    } catch (e) {
        u(e, !1);
    }
}, a = new u.Strategy(o, s);
