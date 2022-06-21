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
  const char = req.validated as ICreateUserChar;
  const remainingPoints = 15; // passado aqui pois, não precisa ser passado na requisição já que o default é 15.
  const totalPoints =
    char.vigor + char.strength + char.agility + char.magic + char.defense;
  const user: User = req.user;

  if (totalPoints > remainingPoints) {
    // if (user.adm) {
    //   return next();
    // }
    throw new AppError(
      400,
      "You haven't enough points to create this character."
    );
  }
  return next();
};
export default validadeCreateChar;
