import httpStatus from 'http-status';
import { userService } from '../services/index';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

const createMess = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllMess = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getIdbyMess = catchAsync(async (req, res) => {
  const data = await userService.getUserById(req.params.userId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mess not found');
  }
  res.send(data);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export {
  createMess,
  getAllMess,
  getIdbyMess,
  updateUser,
  deleteUser,
};
