"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return e;
    }
});
const t = (e, o, r)=>{
    if (r === o.length - 1) {
        delete e[o[r]];
        return;
    }
    t(e[o[r]], o, r + 1);
}, e = (e)=>{
    let o;
    e.options.toJSON && e.options.toJSON.transform && (o = e.options.toJSON.transform), e.options.toJSON = Object.assign(e.options.toJSON || {}, {
        transform (r, s, n) {
            if (Object.keys(e.paths).forEach((o)=>{
                e.paths[o].options && e.paths[o].options.private && t(s, o.split('.'), 0);
            }), s.id = s._id.toString(), delete s._id, delete s.__v, delete s.createdAt, delete s.updatedAt, o) return o(r, s, n);
        }
    });
};
