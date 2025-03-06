"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(e, t) {
    for(var r in t)Object.defineProperty(e, r, {
        enumerable: !0,
        get: t[r]
    });
}(exports, {
    roleRights: function() {
        return t;
    },
    roles: function() {
        return e;
    }
});
const e = [
    'user',
    'admin'
], t = new Map();
t.set(e[0], [
    'logout',
    'tweet'
]), t.set(e[1], []);
