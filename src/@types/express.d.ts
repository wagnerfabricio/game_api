import { User, Char, Attack, Sprite, Status } from "../entities";

declare global {
  namespace Express {
    interface Request {
      validated: User | Char | Attack | Sprite | Status;
      char: Char;
      user: User;
      decoded: User;
    }
  }
}
