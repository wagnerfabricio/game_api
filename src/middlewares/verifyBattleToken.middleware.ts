import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { AppError } from "../errors";

import dotenv from "dotenv";
import { IFighters } from "../interfaces";

dotenv.config();

const verifyBattleToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.user.char.token;

  if (!token) {
    throw new AppError(
      404,
      "You are not in battle! Please start a battle first."
    );
  }

  verify(
    token,
    process.env.SECRET_KEY,
    async (err: VerifyErrors, decoded: string | JwtPayload) => {
      if (err) {
        throw new AppError(401, err);
      }

      req.fighters = decoded as IFighters;
    }
  );
  return next();
};

export default verifyBattleToken;
