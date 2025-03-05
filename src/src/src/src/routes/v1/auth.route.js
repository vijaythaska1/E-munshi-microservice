import r from "express";
import e from "fs";
import o from "path";
import t from "../../middlewares/auth";
import a from "../../middlewares/validate";
import * as l from "../../controllers/auth.controller";
let i = r.Router(), m = {
    auth: t,
    validate: a
}, d = o.join(__dirname, "../../route-Json-File/auth.route.json");
JSON.parse(e.readFileSync(d, "utf8")).forEach((r)=>{
    try {
        let e = r.middlewares ? r.middlewares.map((r)=>{
            let [e, o] = r.split(":");
            return o ? m[e]?.[o] : m[e];
        }).filter(Boolean) : [], o = l[r.handler];
        o ? i[r.method](r.path, ...e, o) : console.warn(`❌ Handler '${r.handler}' not found for route ${r.path}`);
    } catch (e) {
        console.error(`❌ Error processing route ${r.path}:`, e);
    }
});
export default i;
