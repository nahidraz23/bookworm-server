import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthRequest } from "../interfaces/auth.interface";
import { IJwtUserPayload } from "../interfaces/jwt.interface";

export const auth = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & IJwtUserPayload;

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};
