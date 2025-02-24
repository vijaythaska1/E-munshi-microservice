"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../../controllers/auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const express = require("express");
const authValidation = require("../../validations/auth.validation");
const authRoute = express.Router();
authRoute.post("/register", (0, validate_1.default)(authValidation.register), auth_controller_1.register);
authRoute.post("/login", (0, validate_1.default)(authValidation.login), auth_controller_1.login);
authRoute.post("/logout", (0, auth_1.default)("logout"), auth_controller_1.logout);
exports.default = authRoute;
