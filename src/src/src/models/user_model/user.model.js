import e from "mongoose";
import i from "validator";
import r from "bcryptjs";
import { toJSON as t, paginate as s } from "../plugins";
import { roles as a } from "../../config/roles";
let n = new e.Schema({
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
        validate (e) {
            if (!i.isEmail(e)) throw Error("Invalid email");
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
n.plugin(t), n.plugin(s), n.statics.isEmailTaken = async function(e, i) {
    return !!await this.findOne({
        email: e,
        _id: {
            $ne: i
        }
    });
}, n.statics.isUsernameTaken = async function(e, i) {
    return !!await this.findOne({
        userName: e,
        _id: {
            $ne: i
        }
    });
}, n.methods.isPasswordMatch = async function(e) {
    return r.compare(e, this.password);
}, n.pre("save", async function(e) {
    this.isModified("password") && (this.password = await r.hash(this.password, 8)), e();
});
let o = e.model("User", n);
export default o;
