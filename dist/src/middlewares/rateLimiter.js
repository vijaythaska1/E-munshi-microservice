"use strict";
var e;
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "authLimiter", {
    enumerable: !0,
    get: function() {
        return t;
    }
});
const t = (0, ((e = require("express-rate-limit")) && e.__esModule ? e : {
    default: e
}).default)({
    windowMs: 900000,
    max: 20,
    skipSuccessfulRequests: !0
});
