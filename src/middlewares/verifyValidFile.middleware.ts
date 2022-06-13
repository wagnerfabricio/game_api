import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import aws from "aws-sdk";

const verifyValidFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) {
    throw new AppError(400, "Invalid file format");
  }
  next();
};

export default verifyValidFile;
