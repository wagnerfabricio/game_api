import dotenv from "dotenv";

import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";

import { User } from "../entities";
import { AppError } from "../errors";
import { userRepository } from "../repositories";

dotenv.config();

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!(req.validated as User).adm) return next();

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

      if (!user.adm) {
        throw new AppError(422, "Need admin permission.");
      }

      req.user = user;

      return next();
    }
  );
};

export default createAdmin;
