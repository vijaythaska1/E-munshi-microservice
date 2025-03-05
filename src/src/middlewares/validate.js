import r from "../utils/ApiError";
import t from "../utils/pick";
import e from "joi";
import o from "http-status";
export default ((i)=>(a, s)=>{
        let m = t(i, [
            "params",
            "query",
            "body"
        ]), p = t(a, Object.keys(m)), { value: l, error: f } = e.compile(m).prefs({
            errors: {
                label: "key"
            },
            abortEarly: !1
        }).validate(p);
        if (f) {
            let t = f.details.map((r)=>r.message).join(", ");
            return s(new r(o.BAD_REQUEST, t));
        }
        return Object.assign(a, l), s();
    });
