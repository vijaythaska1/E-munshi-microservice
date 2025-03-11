import httpStatus from 'http-status';
import { ObjectId } from 'mongoose';
import { IUser, User } from '../models/index';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody: any): Promise<IUser> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    //  return failed(res, httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<any>}
 */
const queryUsers = async (
  filter: object,
  options: { sortBy?: string; limit?: number; page?: number }
): Promise<any> => {
  // console.log(filter,options);return

  const users = await User.paginate(filter, options);
  return users;
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
 * @returns {Promise<IUser>}
 */
const getUserByEmail = async (email: string): Promise<IUser> => {
  const data: any = User.findOne({ email, role: 1, isDeleted: false }).lean();
  return data;
};

/**
 * Get user by address
 * @param {string} address
 * @returns {Promise<IUser>}
 */
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
  deleteUserById,
  getUserByAddress,
  getUserByEmail,
  getUserById,
  queryUsers,
  searchUsersByName,
  updateUserById,
};
