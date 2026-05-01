import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return next(new AppError("Forbidden", 403));
  }
  next();
};
