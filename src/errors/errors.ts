import { NextFunction, Request, Response } from "express";

type TMessage = string | Record<string, any>;

class AppError {
  public statusCode: number;
  public message: TMessage;

  constructor(statusCode: number, message: TMessage) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export { AppError, errorHandler };
