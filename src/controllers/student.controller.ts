import httpStatus from 'http-status';
import { userService } from '../services';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

const createStudent = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllStudent = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ["details.name", 'role']);
  const filter: { [key: string]: any } = {};
  if (req.query.name) {
    filter['details.name'] = req.query.name;
  } else if (req.query.role) {
    filter.role = req.query.role;
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getIdbyStudent = catchAsync(async (req, res) => {
  const data = await userService.getUserById({_id: req.params.userId});
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  res.send(data);
});

const updateStudent = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteStudent = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStudent,
  getAllStudent,
  getIdbyStudent,
  updateStudent,
  deleteStudent,
};
