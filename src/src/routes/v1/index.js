import e from '../../config/config';
import t from './auth.route';
let o = require('express').Router();
[
  {
    path: '/auth',
    route: t,
  },
].forEach((e) => {
  o.use(e.path, e.route);
}),
  'development' === e.env &&
    [].forEach((e) => {
      o.use(e.path, e.route);
    });
export default o;
