import { Request, Response } from "express";
import dataSource from "../data-source";
import { Attack, Char } from "../entities";
import { Sprite, Status } from "../entities/char";
import { charRepository } from "../repositories";

class CharService {
  create = async ({ validated }: Request): Promise<Char> => {
    const char = await charRepository.save(validated as Char);
    return char;
  };

  getAll = async (): Promise<Char[]> => {
    const chars = await charRepository.getAll();
    return chars;
  };

  retrieve = async ({ char }: Request): Promise<Char> => {
    const foundChar = await charRepository.retrieve(char);
    return foundChar;
  };

  update = async ({ char, validated }: Request) => {
    const updatedChar = await charRepository.update(char.id, {
      ...(validated as Char),
    });
    return updatedChar;
  };

  createFullChar = async (req: Request) => {
    const {
      name,
      vigor,
      strength,
      agility,
      magic,
      defense,
      hp,
      points,
      spriteId,
    } = req.body;

    const newChar = new Char();

    newChar.name = name;

    const newStatus = new Status();
    newStatus.vigor = vigor;
    newStatus.strength = strength;
    newStatus.agility = agility;
    newStatus.magic = magic;
    newStatus.defense = defense;
    newStatus.hp = hp;
    newStatus.points = points;

    newChar.status = newStatus;

    const charSprite = await dataSource
      .getRepository(Sprite)
      .findOneByOrFail({ id: spriteId });

    newChar.sprite = charSprite;

    const attackList = await dataSource
      .getRepository(Attack)
      .createQueryBuilder()
      .orderBy("RANDOM()")
      .limit(3)
      .getMany();

    newChar.attacks = attackList;

    await charRepository.save(newChar);

    return newChar;
  };
}

export default new CharService();
