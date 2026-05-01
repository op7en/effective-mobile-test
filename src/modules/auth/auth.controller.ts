import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "./auth.dto";
import * as authService from "./auth.service";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dto = registerSchema.parse(req.body);
    const user = await authService.register(dto);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dto = loginSchema.parse(req.body);
    const result = await authService.login(dto);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
