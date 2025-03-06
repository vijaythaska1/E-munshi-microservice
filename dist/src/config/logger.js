"use strict";
var e;
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return o;
    }
});
const t = (e = require("winston")) && e.__esModule ? e : {
    default: e
}, r = t.default.format((e)=>(e instanceof Error && Object.assign(e, {
        message: e.stack
    }), e)), o = t.default.createLogger({
    level: 'info',
    format: t.default.format.combine(r(), t.default.format.uncolorize(), t.default.format.splat(), t.default.format.printf(({ level: e, message: t })=>`${e}: ${t}`)),
    transports: [
        new t.default.transports.Console({
            stderrLevels: [
                'error'
            ]
        })
    ]
});
