import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("No token provided", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token) as { id: string; role: string };
    req.user = { id: payload.id, role: payload.role as any };
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};
