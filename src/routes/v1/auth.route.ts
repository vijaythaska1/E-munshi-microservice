// import { login, register, logout } from "../../controllers/auth.controller";
// import auth from "../../middlewares/auth";
// import validate from "../../middlewares/validate";
// const express = require("express");
// const authValidation = require("../../validations/auth.validation");
// const authRoute = express.Router();

// authRoute.post("/register", validate(authValidation.register), register);
// authRoute.post("/login", validate(authValidation.login), login);
// authRoute.post("/logout", auth("logout"), logout);

// export default authRoute;

import express from 'express';
import fs from 'fs';
import path from 'path';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import * as authController from '../../controllers/auth.controller';

const authRoute = express.Router();
const middlewareMap: Record<string, any> = { auth, validate };
const handlerMap: Record<string, any> = authController;

const routesFile = path.join(
  __dirname,
  '../../route-Json-File/auth.route.json'
);
const routesData = JSON.parse(fs.readFileSync(routesFile, 'utf8'));

routesData.forEach(
  (route: {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    path: string;
    middlewares?: string[];
    handler: string;
  }) => {
    try {
      const middlewares = route.middlewares
        ? route.middlewares
            .map((mw: string) => {
              const [name, param] = mw.split(':');
              return param ? middlewareMap[name]?.[param] : middlewareMap[name];
            })
            .filter(Boolean)
        : [];
      const handler = handlerMap[route.handler];
      if (handler) {
        (authRoute as any)[route.method](route.path, ...middlewares, handler);
      } else {
        console.warn(
          `❌ Handler '${route.handler}' not found for route ${route.path}`
        );
      }
    } catch (routeError) {
      console.error(`❌ Error processing route ${route.path}:`, routeError);
    }
  }
);

export default authRoute;
