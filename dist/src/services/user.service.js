"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(e, t) {
    for(var a in t)Object.defineProperty(e, a, {
        enumerable: !0,
        get: t[a]
    });
}(exports, {
    createUser: function() {
        return r;
    },
    deleteUserById: function() {
        return l;
    },
    getUserByAddress: function() {
        return i;
    },
    getUserByEmail: function() {
        return d;
    },
    getUserById: function() {
        return u;
    },
    searchUsersByName: function() {
        return f;
    },
    updateUserById: function() {
        return s;
    }
});
const e = /*#__PURE__*/ n(require("http-status")), t = /*#__PURE__*/ n(require("../models/user_model/user.model")), a = /*#__PURE__*/ n(require("../utils/ApiError"));
function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const r = async (n)=>{
    if (await t.default.isEmailTaken(n.email)) throw new a.default(e.default.BAD_REQUEST, 'Email already taken');
    if (await t.default.isUsernameTaken(n.userName)) throw new a.default(e.default.BAD_REQUEST, 'userName already taken');
    return (await t.default.create(n)).toObject();
}, u = async (e)=>t.default.findById(e).lean(), d = async (e)=>t.default.findOne({
        email: e
    }), i = async (e)=>t.default.findOne({
        address: e
    }).lean(), s = async (e, a)=>await t.default.findByIdAndUpdate(e, a, {
        new: !0
    }).lean(), l = async (n)=>{
    if (!await u(n)) throw new a.default(e.default.NOT_FOUND, 'User not found');
    return await t.default.deleteOne({
        _id: n
    }), 'user deleted successfully';
}, f = async (e, a, n)=>await t.default.find({
        userName: {
            $regex: e,
            $options: 'i'
        }
    }).limit(parseInt(n.toString())).skip(a * Number(n));
