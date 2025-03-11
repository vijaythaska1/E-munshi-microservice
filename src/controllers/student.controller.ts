import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from '../services';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

interface QueryOptions {
  sortBy?: string;
  limit?: number;
  page?: number;
  [key: string]: any;
}

/**
 * Create a new student
 */

const createStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  }
);

/**
 * Get all students with optional filtering
 */
const getAllStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    // const filter = pick(req.query, ["details.name", 'role']);
    const filter: { [key: string]: any } = {};

    if (req.query.name) {
      filter['details.name'] = req.query.name;
    } else if (req.query.role) {
      filter.role = req.query.role;
    }

    const options: QueryOptions = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
  }
);

/**
 * Get student by ID
 */
const getIdbyStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const data = await userService.getUserById({ _id: req.params.userId });

    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }

    res.send(data);
  }
);

/**
 * Update student by ID
 */
const updateStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
  }
);

/**
 * Delete student by ID
 */
const deleteStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
  }
);

export {
  createStudent,
  deleteStudent,
  getAllStudent,
  getIdbyStudent,
  updateStudent,
};
