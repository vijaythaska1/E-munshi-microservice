import httpStatus from 'http-status';
import { IUser } from '../models/user_model/user.interface';
import User from '../models/user_model/user.model';

import ApiError from '../utils/ApiError';
import { ObjectId } from 'mongoose';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody: any): Promise<IUser> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  } else if (await User.isUsernameTaken(userBody.userName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'userName already taken');
  }
  const usr = await User.create(userBody);
  return usr.toObject();
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id: ObjectId): Promise<IUser> => {
  return User.findById(id).lean();
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email: string): Promise<IUser> => {
  const data: any = User.findOne({ email });
  return data;
};

const getUserByAddress = async (address: any) => {
  return User.findOne({ address }).lean();
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (
  userId: ObjectId,
  updateBody: object
): Promise<IUser> => {
  const user: any = await User.findByIdAndUpdate(userId, updateBody, {
    new: true,
  }).lean();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<string>}
 */
const deleteUserById = async (userId: ObjectId): Promise<string> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await User.deleteOne({ _id: userId });
  return 'user deleted successfully';
};

const searchUsersByName = async (
  keyword: any,
  page: number,
  perPage: string | number
) => {
  return await User.find({ userName: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage.toString()))
    .skip(page * Number(perPage));
};

export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUserByAddress,
  searchUsersByName,
};
