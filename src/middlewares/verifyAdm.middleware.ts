import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { User } from "../entities";

const verifyAdm = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.user;

  if (user.adm) {
    return next();
  }

  const { id } = req.params;

  if (user.id != id) {
    throw new AppError(422, "Need admin permission.");
  }

  return next();
};

export default verifyAdm;
