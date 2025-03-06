"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return d;
    }
});
const e = /*#__PURE__*/ a(require("express")), r = /*#__PURE__*/ a(require("fs")), t = /*#__PURE__*/ a(require("path")), n = /*#__PURE__*/ a(require("../../middlewares/auth")), o = /*#__PURE__*/ a(require("../../middlewares/validate")), u = /*#__PURE__*/ function(e, r) {
    if (e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
    };
    var t = l(r);
    if (t && t.has(e)) return t.get(e);
    var n = {
        __proto__: null
    }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var u in e)if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
        var a = o ? Object.getOwnPropertyDescriptor(e, u) : null;
        a && (a.get || a.set) ? Object.defineProperty(n, u, a) : n[u] = e[u];
    }
    return n.default = e, t && t.set(e, n), n;
}(require("../../controllers/auth.controller"));
function a(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
function l(e) {
    if ("function" != typeof WeakMap) return null;
    var r = new WeakMap(), t = new WeakMap();
    return (l = function(e) {
        return e ? t : r;
    })(e);
}
const i = e.default.Router(), f = {
    auth: n.default,
    validate: o.default
}, _ = t.default.join(__dirname, '../../route-Json-File/auth.route.json');
JSON.parse(r.default.readFileSync(_, 'utf8')).forEach((e)=>{
    try {
        let r = e.middlewares ? e.middlewares.map((e)=>{
            let [r, t] = e.split(':');
            return t ? f[r]?.[t] : f[r];
        }).filter(Boolean) : [], t = u[e.handler];
        t ? i[e.method](e.path, ...r, t) : console.warn(`❌ Handler '${e.handler}' not found for route ${e.path}`);
    } catch (r) {
        console.error(`❌ Error processing route ${e.path}:`, r);
    }
});
const d = i;
