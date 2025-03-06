"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return o;
    }
});
const e = require("mongoose"), t = require("../../config/tokens"), r = require("../plugins"), n = new e.Schema({
    token: {
        type: String,
        required: !0,
        index: !0
    },
    user: {
        type: e.Schema.Types.ObjectId,
        ref: 'User',
        required: !0
    },
    type: {
        type: String,
        enum: [
            t.tokenTypes.ACCESS,
            t.tokenTypes.RESET_PASSWORD,
            t.tokenTypes.VERIFY_EMAIL
        ],
        required: !0
    },
    expires: {
        type: Date,
        required: !1
    },
    blacklisted: {
        type: Boolean,
        default: !1
    }
}, {
    timestamps: !0
});
n.plugin(r.toJSON);
const o = (0, e.model)('Token', n);
