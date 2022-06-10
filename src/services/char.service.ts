import { Request, Response } from "express";
import dataSource from "../data-source";
import { Attack, Category, Char } from "../entities";
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

  createFullChar = async (req: Request, res: Response) => {
    const {
      name,
      life,
      currentLife,
      resource,
      currentResource,
      defense,
      category,
    } = req.body;

    const newChar = new Char();

    newChar.name = name;
    newChar.life = life;
    newChar.currentLife = currentLife;
    newChar.resource = resource;
    newChar.currentResource = currentResource;
    newChar.defense = defense;

    const attacks = category.attacks.map((attack) => {
      const newAttack = new Attack();
      newAttack.name = attack.name;
      newAttack.damage = attack.damage;
      newAttack.resource = attack.resource;
      return newAttack;
    });

    const newCategory = new Category();
    newCategory.name = category.name;

    newCategory.attacks = attacks;

    newChar.category = newCategory;

    dataSource
      .getRepository(Char)
      .save(newChar)
      .then((response) => res.status(201).json(response));
  };
}

export default new CharService();
