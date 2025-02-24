"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const httpStatus = __importStar(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_service_1 = require("../services/user.service");
const token_service_1 = require("../services/token.service");
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.createUser)(req.body);
    const token = yield (0, token_service_1.generateAuthTokens)(user);
    res.status(httpStatus.OK)
        .send({ message: "user created successfully", user, token });
}));
exports.register = register;
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_service_1.getUserByEmail)(email);
    if (!user) {
        res.status(httpStatus.UNAUTHORIZED).send({
            message: "Invalid credentials",
        });
        return;
    }
    const isPasswordMatch = yield user.isPasswordMatch(password);
    if (!isPasswordMatch) {
        res.status(httpStatus.UNAUTHORIZED).send({
            message: "Invalid credentials",
        });
        return;
    }
    const token = yield (0, token_service_1.generateAuthTokens)(user);
    res.status(httpStatus.OK).send({ message: "login successful", user, token });
}));
exports.login = login;
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    yield (0, token_service_1.removeToken)(user);
    res.status(httpStatus.OK).send({
        message: "logout successful",
        status: true,
    });
}));
exports.logout = logout;
