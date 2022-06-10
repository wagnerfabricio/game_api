import { Request, Response } from "express";
import dataSource from "../data-source";
import { Attack, Category, Char } from "../entities";

class CharService {
  newChar = async (req: Request, res: Response) => {
    const { name, life, currentLife, resource, currentResource, defense } =
      req.body;

    const char = new Char();

    char.name = name;
    char.life = life;
    char.currentLife = currentLife;
    char.resource = resource;
    char.currentResource = currentResource;
    char.defense = defense;

    dataSource
      .getRepository(Char)
      .save(char)
      .then((response) => res.status(201).json(response));
  };

  getAll = async (req: Request, res: Response) => {
    return dataSource
      .getRepository(Char)
      .find()
      .then((response) => res.status(200).json(response));
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const char = await dataSource.getRepository(Char).findOneBy({ id });

    return res.status(200).json(char);
  };

  update = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Char);

    const { id } = req.params;
    const { name, life, currentLife, resource, currentResource, defense } =
      req.body;

    const char = await repository.findOneByOrFail({ id });

    char.name = name;
    char.life = life;
    char.currentLife = currentLife;
    char.resource = resource;
    char.currentResource = currentResource;
    char.defense = defense;

    repository.save(char).then((response) => res.status(201).json(response));
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
