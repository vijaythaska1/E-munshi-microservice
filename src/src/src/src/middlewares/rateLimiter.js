import e from "express-rate-limit";
let s = e({
    windowMs: 900000,
    max: 20,
    skipSuccessfulRequests: !0
});
export { s as authLimiter };
