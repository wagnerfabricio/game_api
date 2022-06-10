import express from "express";
import { User, Char, Attack, Category } from "../entities";

declare global {
  namespace Express {
    interface Request {
      validated: User | Char | Attack | Category;
      char: Char;
      user: User;
      decoded: User;
    }
  }
}
