import * as e from "joi";
let { password: r } = require("./custom.validation"), i = {
    body: e.object().keys({
        name: e.string().required(),
        userName: e.string().required(),
        password: e.string().required(),
        email: e.string().required().email(),
        age: e.number().required()
    })
}, s = {
    body: e.object().keys({
        password: e.string().required(),
        email: e.string().required().email()
    })
}, o = {
    body: e.object().keys({
        refreshToken: e.string().required()
    })
}, t = {
    body: e.object().keys({
        refreshToken: e.string().required()
    })
}, d = {
    body: e.object().keys({
        email: e.string().email().required(),
        code: e.string().length(4).required()
    })
}, n = {
    body: e.object().keys({
        email: e.string().required().email(),
        password: e.string().required().custom(r)
    })
}, u = {
    query: e.object().keys({
        token: e.string().required()
    })
};
export { i as register, s as login, o as logout, t as refreshTokens, d as forgotPassword, n as resetPassword, u as verifyEmail };
