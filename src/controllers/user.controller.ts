import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userService } from "../services";

class UserController {
  insertUser = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = await userService.insertUserService(req);

    return res.status(201).json(user);
  };
}

export default new UserController();
