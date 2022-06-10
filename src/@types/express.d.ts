import express from "express";
import { User, Char, Attack } from "../entities";

declare global {
  namespace Express {
    interface Request {
      validated: User | Char | Attack;
      char: Char;
      user: User;
      decoded: User;
    }
  }
}
