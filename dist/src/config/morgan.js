"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(e, r) {
    for(var t in r)Object.defineProperty(e, t, {
        enumerable: !0,
        get: r[t]
    });
}(exports, {
    errorHandler: function() {
        return i;
    },
    successHandler: function() {
        return a;
    }
});
const e = /*#__PURE__*/ s(require("./config")), r = /*#__PURE__*/ s(require("./logger")), t = /*#__PURE__*/ s(require("morgan"));
function s(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
t.default.token('message', (e, r)=>r.locals.errorMessage || '');
const o = ()=>'production' === e.default.env ? ':remote-addr - ' : '', u = `${o()}:method :url :status - :response-time ms`, n = `${o()}:method :url :status - :response-time ms - message: :message`, a = (0, t.default)(u, {
    skip: (e, r)=>r.statusCode >= 400,
    stream: {
        write: (e)=>r.default.info(e.trim())
    }
}), i = (0, t.default)(n, {
    skip: (e, r)=>r.statusCode < 400,
    stream: {
        write: (e)=>r.default.error(e.trim())
    }
});
