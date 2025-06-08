import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No valid token is provided! Authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, "JWT_SECRET") as DecodedToken;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token is not valid token, Pls try again",
    });
  }
};
