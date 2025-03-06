"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return u;
    }
});
const e = /*#__PURE__*/ a(require("mongoose")), t = /*#__PURE__*/ a(require("validator")), r = /*#__PURE__*/ a(require("bcryptjs")), i = require("../plugins"), s = require("../../config/roles");
function a(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
const n = new e.default.Schema({
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
            if (!t.default.isEmail(e)) throw Error('Invalid email');
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
        enum: s.roles,
        default: 'user'
    }
}, {
    timestamps: !0
});
n.plugin(i.toJSON), n.plugin(i.paginate), n.statics.isEmailTaken = async function(e, t) {
    return !!await this.findOne({
        email: e,
        _id: {
            $ne: t
        }
    });
}, n.statics.isUsernameTaken = async function(e, t) {
    return !!await this.findOne({
        userName: e,
        _id: {
            $ne: t
        }
    });
}, n.methods.isPasswordMatch = async function(e) {
    return r.default.compare(e, this.password);
}, n.pre('save', async function(e) {
    this.isModified('password') && (this.password = await r.default.hash(this.password, 8)), e();
});
const u = e.default.model('User', n);
