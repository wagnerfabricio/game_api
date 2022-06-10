import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request } from "express";
import { User } from "../entities";
import { AppError } from "../errors";
import userRepository from "../repositories/user.repository";

import dotenv from "dotenv";

dotenv.config();

class userService {
  insertUserService = async (req: Request) => {
    const userData = req.body;

    const pwd: string = await hash(req.body.password, 10);
    req.body.password = pwd;

    const user: User = await userRepository.save(userData);

    return user;
  };

  loginService = async (req: Request) => {
    const email = req.body.email;
    const password = req.body.password;

    const user: User = await userRepository.retrieve({ email });

    if (!user) {
      throw new AppError(404, "Invalid credentials");
    }

    const matchPwd: Boolean = await user.comparePwd(password);

    if (!matchPwd) {
      throw new AppError(404, "Invalid credentials");
    }

    if (!user.active) {
      user.active = true;

      userRepository.update(user.id, { active: user.active });
    }

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return token;
  };

  getAllUsersService = async () => {
    const users: User[] = await userRepository.getAll();

    return users;
  };

  updateUser = (req: Request) => {
    const user: User = req.user;
    const body = req.body;

    userRepository.update(user.id, body);

    return { ...user, ...body };
  };

  deleteUserService = (req: Request) => {
    const user: User = req.user;
    user.active = false;

    userRepository.update(user.id, { active: user.active });

    return user;
  };
}

export default new userService();
