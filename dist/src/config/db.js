"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "connectDB", {
    enumerable: !0,
    get: function() {
        return t;
    }
});
const e = /*#__PURE__*/ n(require("mongoose")), o = /*#__PURE__*/ n(require("./config"));
function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const t = async ()=>{
    console.log('Attempting DB connection');
    try {
        let n = await e.default.connect(o.default.mongoose.url);
        console.log(`MongoDB Connected: ${n.connection.host}`);
    } catch (e) {
        console.log('Db connection error', e);
    }
};
