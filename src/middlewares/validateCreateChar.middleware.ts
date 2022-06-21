import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { User } from "../entities";
import { AppError } from "../errors";
import { ICreateUserChar } from "../interfaces";

const validadeCreateChar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const char = req.body as ICreateUserChar;
  const remainingPoints = 15;
  const totalPoints =
    char.vigor + char.strength + char.agility + char.magic + char.defense;
  const user: User = req.user;

  if (totalPoints > remainingPoints) {
    if (user.adm) {
      return next();
    }
    throw new AppError(400, {
      error: "You do not have enough points to create this character.",
    });
  }
  return next();
};
export default validadeCreateChar;
