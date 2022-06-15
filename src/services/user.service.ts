import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request } from "express";
import { User } from "../entities";
import { AppError } from "../errors";
import userRepository from "../repositories/user.repository";

import dotenv from "dotenv";
import { validateSchema } from "../middlewares";
import { userSchema } from "../schemas";
import { serializeSchema } from "../utils";

dotenv.config();

class userService {
  insertUserService = async ({ validated }: Request) => {
    const pwd: string = await hash((validated as User).password, 10);
    (validated as User).password = pwd;

    const user: User = await userRepository.save(validated as User);

    return (await serializeSchema(userSchema.user, user)) as User;
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

    const token: string = sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return token;
  };

  getAllUsersService = async () => {
    const users: User[] = await userRepository.getAll();

    const serializedUsers: User[] = await Promise.all(
      users.map(async (user) => {
        return (await serializeSchema(userSchema.user, user)) as User;
      })
    );

    return serializedUsers;
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
