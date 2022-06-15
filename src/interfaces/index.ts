import { Char } from "../entities";

export interface ICreateUserChar {
  name: string;
  vigor: number;
  strength: number;
  agility: number;
  magic: number;
  defense: number;
  hp?: number;
  points: number;
  spriteId: string;
}

export interface IFighters {
  char: Char;
  enemy: Char;
}
