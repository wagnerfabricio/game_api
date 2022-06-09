import { Request, Response } from "express";
import { User } from "../entities";
import { userService } from "../services";

class UserController {
  insertUser = async (req: Request, res: Response) => {
    const user: User = await userService.insertUserService(req);

    return res.status(201).json(user);
  };

  getAllUsers = async (_: Request, res: Response) => {
    const users: User[] = await userService.getAllUsersService();

    return res.status(200).json({ users });
  };

  getUserById = (req: Request, res: Response) => {
    const user: User = req.user;

    return res.status(200).json({ user });
  };
}

export default new UserController();
