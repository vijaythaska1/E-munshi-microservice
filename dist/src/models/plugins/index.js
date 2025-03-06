"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function (e, t) {
    for (var n in t) Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
    });
}(exports, {
    paginate: function () {
        return t.default;
    },
    toJSON: function () {
        return e.default;
    }
});
const e = /*#__PURE__*/ n(require("./toJSON.plugin")), t = /*#__PURE__*/ n(require("./paginate.plugin"));
function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
