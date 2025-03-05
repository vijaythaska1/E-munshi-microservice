import e from "http-status";
import a from "../models/user_model/user.model";
import s from "../utils/ApiError";
let r = async (r)=>{
    if (await a.isEmailTaken(r.email)) throw new s(e.BAD_REQUEST, "Email already taken");
    if (await a.isUsernameTaken(r.userName)) throw new s(e.BAD_REQUEST, "userName already taken");
    return (await a.create(r)).toObject();
}, t = async (e)=>a.findById(e).lean(), n = async (e)=>a.findOne({
        email: e
    }), i = async (e)=>a.findOne({
        address: e
    }).lean(), d = async (e, s)=>await a.findByIdAndUpdate(e, s, {
        new: !0
    }).lean(), l = async (r)=>{
    if (!await t(r)) throw new s(e.NOT_FOUND, "User not found");
    return await a.deleteOne({
        _id: r
    }), "user deleted successfully";
}, m = async (e, s, r)=>await a.find({
        userName: {
            $regex: e,
            $options: "i"
        }
    }).limit(parseInt(r.toString())).skip(s * Number(r));
export { r as createUser, t as getUserById, n as getUserByEmail, d as updateUserById, l as deleteUserById, i as getUserByAddress, m as searchUsersByName };
