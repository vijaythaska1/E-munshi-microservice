import express from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getIdbyStudent,
  updateStudent,
} from '../../controllers/student.controller';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import * as studentValidation from '../../validations/student.validation';
const authRoute = express.Router();

authRoute.post(
  '/studentRegister',
  validate(studentValidation.createStudent),
  auth(),
  createStudent
);

authRoute.post(
  '/getAllStudent',
  validate(studentValidation.getStudent),
  auth(),
  getAllStudent
);

authRoute.post(
  '/getIdbyStudent',
  validate(studentValidation.getIdByStudent),
  auth(),
  getIdbyStudent
);

authRoute.post(
  '/updateStudent',
  validate(studentValidation.updateStudent),
  auth(),
  updateStudent
);

authRoute.post(
  '/deleteStudent',
  validate(studentValidation.deleteUser),
  auth(),
  deleteStudent
);

export default authRoute;
