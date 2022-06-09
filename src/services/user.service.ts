import { hash } from "bcrypt";
import { Request } from "express";
import { User } from "../entities";
import userRepository from "../repositories/user.repository";

class userService {
  insertUserService = async (req: Request) => {
    const userData = req.body;

    const pwd = await hash(req.body.password, 10);
    req.body.password = pwd;

    const user: User = await userRepository.save(userData);

    return user;
  };
}

export default new userService();
