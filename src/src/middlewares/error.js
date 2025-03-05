import e from "../config/config";
import o from "../config/logger";
import r from "../utils/ApiError";
import t from "mongoose";
import s from "http-status";
let n = (e, o, n, R)=>{
    let i = e;
    if (console.log(o, n), !(i instanceof r)) {
        let o = i.statusCode || i instanceof t.Error ? s.BAD_REQUEST : s.INTERNAL_SERVER_ERROR, n = i.message || s[o];
        i = new r(o, n, !1, e.stack);
    }
    R(i);
}, R = (r, t)=>{
    let { statusCode: n, message: R } = r;
    "production" !== e.env || r.isOperational || (n = s.INTERNAL_SERVER_ERROR, R = s[s.INTERNAL_SERVER_ERROR]), t.locals.errorMessage = r.message;
    let i = {
        code: n,
        message: R,
        ..."development" === e.env && {
            stack: r.stack
        }
    };
    "development" === e.env && o.error(r), t.status(n).send(i);
};
export { n as errorConverter, R as errorHandler };
