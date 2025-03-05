import { model as e, Schema as t } from "mongoose";
import { tokenTypes as r } from "../../config/tokens";
import { toJSON as o } from "../plugins";
let i = new t({
    token: {
        type: String,
        required: !0,
        index: !0
    },
    user: {
        type: t.Types.ObjectId,
        ref: "User",
        required: !0
    },
    type: {
        type: String,
        enum: [
            r.ACCESS,
            r.RESET_PASSWORD,
            r.VERIFY_EMAIL
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
i.plugin(o);
let p = e("Token", i);
export default p;
