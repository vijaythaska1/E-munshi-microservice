"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(e, t) {
    for(var a in t)Object.defineProperty(e, a, {
        enumerable: !0,
        get: t[a]
    });
}(exports, {
    objectId: function() {
        return e;
    },
    password: function() {
        return t;
    }
});
const e = (e, t)=>e.match(/^[0-9a-fA-F]{24}$/) ? e : t.message('"{{#label}}" must be a valid mongo id'), t = (e, t)=>e.length < 8 ? t.message('password must be at least 8 characters') : e.match(/\d/) && e.match(/[a-zA-Z]/) ? e : t.message('password must contain at least 1 letter and 1 number');
