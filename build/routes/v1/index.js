"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config/config"));
const auth_route_1 = __importDefault(require("./auth.route"));
const express = require("express");
const router = express.Router();
const defaultRoutes = [
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    // {
    //   path: "/tweet",
    //   route: tweetRoute,
    // },
];
const devRoutes = [];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
/* istanbul ignore next */
if (config_1.default.env === "development") {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}
exports.default = router;
