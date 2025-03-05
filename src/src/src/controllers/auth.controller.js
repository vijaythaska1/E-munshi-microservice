import s from "http-status";
import e from "../utils/catchAsync";
import { createUser as t, getUserByEmail as a } from "../services/user.service";
import { generateAuthTokens as r, removeToken as o } from "../services/token.service";
let i = e(async (e, a)=>{
    let o = await t(e.body), i = await r(o);
    a.status(s.OK).send({
        message: "user created successfully",
        user: o,
        token: i
    });
}), u = e(async (e, t)=>{
    let { email: o, password: i } = e.body, u = await a(o);
    if (!u || !await u.isPasswordMatch(i)) {
        t.status(s.UNAUTHORIZED).send({
            message: "Invalid credentials"
        });
        return;
    }
    let c = await r(u);
    t.status(s.OK).send({
        message: "login successful",
        user: u,
        token: c
    });
}), c = e(async (e, t)=>{
    let a = e.user;
    await o(a), t.status(s.OK).send({
        message: "logout successful",
        status: !0
    });
});
export { i as register, u as login, c as logout };
