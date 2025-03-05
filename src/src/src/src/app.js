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
import x from "./routes/v1";
let g = s();
g.use(u), g.use(f), g.use(e()), g.use(s.json()), g.use(s.urlencoded({
    extended: !0
})), g.use(c({
    rawBodyOptions: {
        limit: "30mb"
    },
    busboyOptions: {
        limits: {
            fields: 50
        }
    }
})), g.use(t()), g.use(i()), g.use(m()), g.use(p()), g.options("*", p()), g.use(a.initialize()), a.use("jwt", n), g.use("/v1", x), g.use((s)=>{
    s(new o(r.NOT_FOUND, "Not found"));
}), g.use(l), g.use(d);
export { g as app };
