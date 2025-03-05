import i from "mongoose";
import e from "validator";
import r from "bcryptjs";
import { toJSON as t, paginate as s } from "../plugins";
import { roles as a } from "../../config/roles";
let n = new i.Schema({
    userName: {
        type: String,
        required: !0,
        trim: !0,
        unique: !1
    },
    age: {
        type: Number,
        required: !0
    },
    email: {
        type: String,
        required: !0,
        trim: !0,
        lowercase: !0,
        validate (i) {
            if (!e.isEmail(i)) throw Error("Invalid email");
        }
    },
    password: {
        type: String,
        required: !0,
        trim: !0,
        minlength: 8,
        private: !0
    },
    role: {
        type: String,
        enum: a,
        default: "user"
    }
}, {
    timestamps: !0
});
n.plugin(t), n.plugin(s), n.statics.isEmailTaken = async function(i, e) {
    return !!await this.findOne({
        email: i,
        _id: {
            $ne: e
        }
    });
}, n.statics.isUsernameTaken = async function(i, e) {
    return !!await this.findOne({
        userName: i,
        _id: {
            $ne: e
        }
    });
}, n.methods.isPasswordMatch = async function(i) {
    return r.compare(i, this.password);
}, n.pre("save", async function(i) {
    this.isModified("password") && (this.password = await r.hash(this.password, 8)), i();
});
let o = i.model("User", n);
export default o;
