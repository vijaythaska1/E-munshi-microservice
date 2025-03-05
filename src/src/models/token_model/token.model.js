import { model as e, Schema as t } from 'mongoose';
import { tokenTypes as r } from '../../config/tokens';
import { toJSON as i } from '../plugins';
let o = new t(
  {
    token: {
      type: String,
      required: !0,
      index: !0,
    },
    user: {
      type: t.Types.ObjectId,
      ref: 'User',
      required: !0,
    },
    type: {
      type: String,
      enum: [r.ACCESS, r.RESET_PASSWORD, r.VERIFY_EMAIL],
      required: !0,
    },
    expires: {
      type: Date,
      required: !1,
    },
    blacklisted: {
      type: Boolean,
      default: !1,
    },
  },
  {
    timestamps: !0,
  }
);
o.plugin(i);
let p = e('Token', o);
export default p;
