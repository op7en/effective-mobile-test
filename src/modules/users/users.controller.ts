import { Request, Response, NextFunction } from "express";
import * as usersService from "./users.service";

export const getByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await usersService.getUserById(
      req.user!.id,
      req.user!.role,
      String(req.params.id),
    );
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await usersService.getAllUsers();
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

export const blockHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await usersService.blockUser(
      req.user!.id,
      req.user!.role,
      String(req.params.id),
    );
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
