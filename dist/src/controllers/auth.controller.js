"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(e, t) {
    for(var s in t)Object.defineProperty(e, s, {
        enumerable: !0,
        get: t[s]
    });
}(exports, {
    login: function() {
        return n;
    },
    logout: function() {
        return i;
    },
    register: function() {
        return r;
    }
});
const e = /*#__PURE__*/ a(require("http-status")), t = require("../services/token.service"), s = require("../services/user.service"), u = /*#__PURE__*/ a(require("../utils/catchAsync"));
function a(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const r = (0, u.default)(async (u, a)=>{
    let r = await (0, s.createUser)(u.body), n = await (0, t.generateAuthTokens)(r);
    a.status(e.default.OK).send({
        message: 'user created successfully',
        user: r,
        token: n
    });
}), n = (0, u.default)(async (u, a)=>{
    let { email: r, password: n } = u.body, i = await (0, s.getUserByEmail)(r);
    if (!i || !await i.isPasswordMatch(n)) {
        a.status(e.default.UNAUTHORIZED).send({
            message: 'Invalid credentials'
        });
        return;
    }
    let c = await (0, t.generateAuthTokens)(i);
    a.status(e.default.OK).send({
        message: 'login successful',
        user: i,
        token: c
    });
}), i = (0, u.default)(async (s, u)=>{
    let a = s.user;
    await (0, t.removeToken)(a), u.status(e.default.OK).send({
        message: 'logout successful',
        status: !0
    });
});
