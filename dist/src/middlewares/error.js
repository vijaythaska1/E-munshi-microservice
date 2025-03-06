"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(e, t) {
    for(var r in t)Object.defineProperty(e, r, {
        enumerable: !0,
        get: t[r]
    });
}(exports, {
    errorConverter: function() {
        return a;
    },
    errorHandler: function() {
        return l;
    }
});
const e = /*#__PURE__*/ u(require("../config/config")), t = /*#__PURE__*/ u(require("../config/logger")), r = /*#__PURE__*/ u(require("../utils/ApiError")), o = /*#__PURE__*/ u(require("mongoose")), n = /*#__PURE__*/ u(require("http-status"));
function u(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const a = (e, t, u, a)=>{
    let l = e;
    if (console.log(t, u), !(l instanceof r.default)) {
        let t = l.statusCode || l instanceof o.default.Error ? n.default.BAD_REQUEST : n.default.INTERNAL_SERVER_ERROR, u = l.message || n.default[t];
        l = new r.default(t, u, !1, e.stack);
    }
    a(l);
}, l = (r, o)=>{
    let { statusCode: u, message: a } = r;
    'production' !== e.default.env || r.isOperational || (u = n.default.INTERNAL_SERVER_ERROR, a = n.default[n.default.INTERNAL_SERVER_ERROR]), o.locals.errorMessage = r.message;
    let l = {
        code: u,
        message: a,
        ...'development' === e.default.env && {
            stack: r.stack
        }
    };
    'development' === e.default.env && t.default.error(r), o.status(u).send(l);
};
