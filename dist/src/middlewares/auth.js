"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return i;
    }
});
const e = /*#__PURE__*/ n(require("../utils/ApiError")), t = /*#__PURE__*/ n(require("passport")), r = /*#__PURE__*/ n(require("http-status")), u = require("../config/roles");
function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const s = (t, n, s, i)=>async (o, a, l)=>{
        if (o || l || !a) return s(new e.default(r.default.UNAUTHORIZED, 'Please authenticate'));
        if (t.user = a, i.length) {
            let t = u.roleRights.get(a.role);
            if (!i.every((e)=>t.includes(e))) return s(new e.default(r.default.FORBIDDEN, 'Forbidden'));
        }
        n();
    }, i = (...e)=>async (r, u, n)=>new Promise((i, o)=>{
            t.default.authenticate('jwt', {
                session: !1
            }, s(r, i, o, e))(r, u, n);
        }).then(()=>n(void 0)).catch((e)=>n(e));
