import express from 'express';
import { login, logout } from '../../controllers/auth.controller';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import * as authValidation from '../../validations/auth.validation';
const authRoute = express.Router();

authRoute.post('/login', validate(authValidation.login), login);
authRoute.post('/logout', auth('logout'), logout);

export default authRoute;
