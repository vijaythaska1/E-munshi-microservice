import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { createUser, getUserByEmail } from "../services/user.service";
import { generateAuthTokens, removeToken } from "../services/token.service";
import { Request, Response } from "express";


const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await createUser(req.body);
  const token = await generateAuthTokens(user);
  res.status(httpStatus.OK)
    .send({ message: "user created successfully", user, token });
});

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(httpStatus.UNAUTHORIZED).send({
      message: "Invalid credentials",
    });
    return;
  }

  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
     res.status(httpStatus.UNAUTHORIZED).send({
      message: "Invalid credentials",
    });
    return;
  }

  const token = await generateAuthTokens(user);
  res.status(httpStatus.OK).send({ message: "login successful", user, token });
});

const logout = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = req.user!;
  await removeToken(user);
  res.status(httpStatus.OK).send({
    message: "logout successful",
    status: true,
  });
});

export { register, login, logout };
