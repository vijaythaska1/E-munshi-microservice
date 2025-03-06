"use strict";
function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return r;
    }
});
class t extends Error {
    constructor(e, t, r = !0, s = ''){
        super(t), this.statusCode = e, this.isOperational = r, s ? this.stack = s : Error.captureStackTrace(this, this.constructor);
    }
}
e(t, "isOperational", void 0), e(t, "statusCode", void 0);
const r = t;
