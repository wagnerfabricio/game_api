import express from "express";
import { Char, Attack, Category } from "../entities";

declare global {
  namespace Express {
    interface Request {
      validated: Char | Attack | Category;
      char: Char;
    }
  }
}
