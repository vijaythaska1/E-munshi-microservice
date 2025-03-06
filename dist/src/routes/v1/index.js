"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return o;
    }
});
const e = /*#__PURE__*/ r(require("../../config/config")), t = /*#__PURE__*/ r(require("./auth.route"));
function r(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const u = require('express').Router();
[
    {
        path: '/auth',
        route: t.default
    }
].forEach((e)=>{
    u.use(e.path, e.route);
}), 'development' === e.default.env && [].forEach((e)=>{
    u.use(e.path, e.route);
});
const o = u;
