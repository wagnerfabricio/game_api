import { User, Char, Attack, Sprite, Status } from "../entities";
import { ICreateUserChar } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      validated: User | Char | Attack | Sprite | Status | ICreateUserChar;
      char: Char;
      user: User;
      status: Status;
      decoded: User;
    }
  }
}
