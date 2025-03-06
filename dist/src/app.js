"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "app", {
    enumerable: !0,
    get: function() {
        return q;
    }
});
const e = /*#__PURE__*/ c(require("compression")), r = /*#__PURE__*/ c(require("cors")), u = /*#__PURE__*/ c(require("express")), s = /*#__PURE__*/ c(require("express-mongo-sanitize")), t = /*#__PURE__*/ c(require("helmet")), _ = /*#__PURE__*/ c(require("http-status")), i = /*#__PURE__*/ c(require("passport")), o = /*#__PURE__*/ c(require("xss-clean")), a = require("./config/morgan"), l = require("./config/passport"), d = /*#__PURE__*/ c(require("./utils/ApiError")), n = require("express-multipart-file-parser"), f = require("./middlewares/error"), p = /*#__PURE__*/ c(require("./routes/v1"));
function c(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const q = (0, u.default)();
q.use(a.successHandler), q.use(a.errorHandler), q.use((0, t.default)()), q.use(u.default.json()), q.use(u.default.urlencoded({
    extended: !0
})), q.use((0, n.fileParser)({
    rawBodyOptions: {
        limit: '30mb'
    },
    busboyOptions: {
        limits: {
            fields: 50
        }
    }
})), q.use((0, o.default)()), q.use((0, s.default)()), q.use((0, e.default)()), q.use((0, r.default)()), q.options('*', (0, r.default)()), q.use(i.default.initialize()), i.default.use('jwt', l.jwtStrategy), q.use('/v1', p.default), q.use((e)=>{
    e(new d.default(_.default.NOT_FOUND, 'Not found'));
}), q.use(f.errorConverter), q.use(f.errorHandler);
