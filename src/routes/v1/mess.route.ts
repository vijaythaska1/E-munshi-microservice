import express from 'express';
import {
  createMess,
  deleteUser,
  getAllMess,
  getIdbyMess,
  updateUser,
} from '../../controllers/mess.controller';
import validate from '../../middlewares/validate';
import * as messValidation from '../../validations/mess.validation';
const authRoute = express.Router();

authRoute.post(
  '/messRegister',
  validate(messValidation.createMess),
  createMess
);

authRoute.post('/getAllStudent', validate(messValidation.getUsers), getAllMess);

authRoute.post(
  '/getIdbyStudent',
  validate(messValidation.getUser),
  getIdbyMess
);

authRoute.post(
  '/updateStudent',
  validate(messValidation.updateUser),
  updateUser
);

authRoute.post(
  '/deleteStudent',
  validate(messValidation.deleteUser),
  deleteUser
);

export default authRoute;
