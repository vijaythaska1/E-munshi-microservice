import r from "http-status";
import o from "./utils/ApiError";
import s from "express";
import e from "helmet";
import t from "xss-clean";
import i from "express-mongo-sanitize";
import m from "compression";
import p from "cors";
import a from "passport";
import { successHandler as u, errorHandler as f } from "./config/morgan";
import { jwtStrategy as n } from "./config/passport";
import { errorConverter as l, errorHandler as d } from "./middlewares/error";
import { fileParser as c } from "express-multipart-file-parser";
import g from "./routes/v1";
let x = s();
x.use(u), x.use(f), x.use(e()), x.use(s.json()), x.use(s.urlencoded({
    extended: !0
})), x.use(c({
    rawBodyOptions: {
        limit: "30mb"
    },
    busboyOptions: {
        limits: {
            fields: 50
        }
    }
})), x.use(t()), x.use(i()), x.use(m()), x.use(p()), x.options("*", p()), x.use(a.initialize()), a.use("jwt", n), x.use("/v1", g), x.use((s)=>{
    s(new o(r.NOT_FOUND, "Not found"));
}), x.use(l), x.use(d);
export { x as app };
