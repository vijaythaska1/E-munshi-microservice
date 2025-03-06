"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(e, r) {
    for(var t in r)Object.defineProperty(e, t, {
        enumerable: !0,
        get: r[t]
    });
}(exports, {
    forgotPassword: function() {
        return s;
    },
    login: function() {
        return i;
    },
    logout: function() {
        return o;
    },
    refreshTokens: function() {
        return u;
    },
    register: function() {
        return n;
    },
    resetPassword: function() {
        return a;
    },
    verifyEmail: function() {
        return c;
    }
});
const e = /*#__PURE__*/ function(e, t) {
    if (e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
    };
    var n = r(t);
    if (n && n.has(e)) return n.get(e);
    var i = {
        __proto__: null
    }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var u in e)if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
        var s = o ? Object.getOwnPropertyDescriptor(e, u) : null;
        s && (s.get || s.set) ? Object.defineProperty(i, u, s) : i[u] = e[u];
    }
    return i.default = e, n && n.set(e, i), i;
}(require("joi"));
function r(e) {
    if ("function" != typeof WeakMap) return null;
    var t = new WeakMap(), n = new WeakMap();
    return (r = function(e) {
        return e ? n : t;
    })(e);
}
const { password: t } = require('./custom.validation'), n = {
    body: e.object().keys({
        name: e.string().required(),
        userName: e.string().required(),
        password: e.string().required(),
        email: e.string().required().email(),
        age: e.number().required()
    })
}, i = {
    body: e.object().keys({
        password: e.string().required(),
        email: e.string().required().email()
    })
}, o = {
    body: e.object().keys({
        refreshToken: e.string().required()
    })
}, u = {
    body: e.object().keys({
        refreshToken: e.string().required()
    })
}, s = {
    body: e.object().keys({
        email: e.string().email().required(),
        code: e.string().length(4).required()
    })
}, a = {
    body: e.object().keys({
        email: e.string().required().email(),
        password: e.string().required().custom(t)
    })
}, c = {
    query: e.object().keys({
        token: e.string().required()
    })
};
