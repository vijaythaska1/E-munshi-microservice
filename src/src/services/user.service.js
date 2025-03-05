import e from 'http-status';
import a from '../models/user_model/user.model';
import r from '../utils/ApiError';
let t = async (t) => {
    if (await a.isEmailTaken(t.email))
      throw new r(e.BAD_REQUEST, 'Email already taken');
    if (await a.isUsernameTaken(t.userName))
      throw new r(e.BAD_REQUEST, 'userName already taken');
    return (await a.create(t)).toObject();
  },
  s = async (e) => a.findById(e).lean(),
  n = async (e) =>
    a.findOne({
      email: e,
    }),
  i = async (e) =>
    a
      .findOne({
        address: e,
      })
      .lean(),
  d = async (e, r) =>
    await a
      .findByIdAndUpdate(e, r, {
        new: !0,
      })
      .lean(),
  l = async (t) => {
    if (!(await s(t))) throw new r(e.NOT_FOUND, 'User not found');
    return (
      await a.deleteOne({
        _id: t,
      }),
      'user deleted successfully'
    );
  },
  m = async (e, r, t) =>
    await a
      .find({
        userName: {
          $regex: e,
          $options: 'i',
        },
      })
      .limit(parseInt(t.toString()))
      .skip(r * Number(t));
export {
  t as createUser,
  s as getUserById,
  n as getUserByEmail,
  d as updateUserById,
  l as deleteUserById,
  i as getUserByAddress,
  m as searchUsersByName,
};
