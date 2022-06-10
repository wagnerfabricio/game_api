import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { AppError } from "../errors";
import { userRepository } from "../repositories";

const getUserOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user: User = await userRepository.retrieve({ id });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  req.user = user as User;

  return next();
};

export default getUserOr404;
