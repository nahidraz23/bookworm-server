import { NextFunction, Response } from "express";
import { IAuthRequest } from "../interfaces/auth.interface";

export const authorize =
  (...roles: ("user" | "admin")[]) =>
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
