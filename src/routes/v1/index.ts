import config from '../../config/config';
import authRoute from './auth.route';
import studentRoute from './student.route';
import messRoute from './mess.route';

import express from 'express';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/mess',
    route: messRoute,
  },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route: any) => {
    router.use(route.path, route.route);
  });
}

export default router;
