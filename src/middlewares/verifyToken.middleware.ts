import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { AppError } from "../errors";

import dotenv from "dotenv";
import { User } from "../entities";
import { userRepository } from "../repositories";

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError(404, "Missing authorization token.");
  }

  return verify(
    token,
    process.env.SECRET_KEY,
    async (err: VerifyErrors, decoded: string | JwtPayload) => {
      if (err) {
        throw new AppError(401, err);
      }

      req.decoded = decoded as User;

      const user: User = await userRepository.retrieve({ id: req.decoded.id });

      if (!user) {
        throw new AppError(404, "User token not found");
      }

      req.user = user;

      return next();
    }
  );
};

export default verifyToken;
