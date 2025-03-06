"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const e = /*#__PURE__*/ function(e, t) {
    if (e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
    };
    var o = c(t);
    if (o && o.has(e)) return o.get(e);
    var r = {
        __proto__: null
    }, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var u in e)if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
        var i = n ? Object.getOwnPropertyDescriptor(e, u) : null;
        i && (i.get || i.set) ? Object.defineProperty(r, u, i) : r[u] = e[u];
    }
    return r.default = e, o && o.set(e, r), r;
}(require("mongoose")), t = require("./app"), o = /*#__PURE__*/ n(require("./config/config")), r = /*#__PURE__*/ n(require("./config/logger"));
function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
function c(e) {
    if ("function" != typeof WeakMap) return null;
    var t = new WeakMap(), o = new WeakMap();
    return (c = function(e) {
        return e ? o : t;
    })(e);
}
(async ()=>{
    let n;
    e.set('strictQuery', !0), await e.connect(o.default.mongoose.url).then(()=>{
        console.log('--database connection successful--');
    }).catch((e)=>{
        console.log('--error connecting to database---', e);
    }), n = t.app.listen(8080, ()=>{
        r.default.info("Listening to port 8080");
    });
    let c = ()=>{
        n ? n.close(()=>{
            r.default.info('Server closed'), process.exit(1);
        }) : process.exit(1);
    }, u = (e)=>{
        r.default.error(e), c();
    };
    process.on('uncaughtException', u), process.on('unhandledRejection', u), process.on('SIGTERM', ()=>{
        r.default.info('SIGTERM received'), n && n.close();
    });
})();
