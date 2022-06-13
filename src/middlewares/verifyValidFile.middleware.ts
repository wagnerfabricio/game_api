import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const verifyValidFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    throw new AppError(400, "Invalid file format");
  }
};

export default verifyValidFile;
