"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return l;
    }
});
const e = /*#__PURE__*/ a(require("../utils/ApiError")), t = /*#__PURE__*/ a(require("../utils/pick")), r = /*#__PURE__*/ a(require("joi")), u = /*#__PURE__*/ a(require("http-status"));
function a(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const l = (a)=>(l, s)=>{
        let _ = (0, t.default)(a, [
            'params',
            'query',
            'body'
        ]), i = (0, t.default)(l, Object.keys(_)), { value: o, error: n } = r.default.compile(_).prefs({
            errors: {
                label: 'key'
            },
            abortEarly: !1
        }).validate(i);
        if (n) {
            let t = n.details.map((e)=>e.message).join(', ');
            return s(new e.default(u.default.BAD_REQUEST, t));
        }
        return Object.assign(l, o), s();
    };
