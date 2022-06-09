import { Request, Response } from "express";
import dataSource from "../data-source";
import { Attack, Category } from "../entities";

class AttackService {
  addAttack = async (req: Request, res: Response) => {
    const { name, damage, resource } = req.body;

    const attack = new Attack();

    attack.name = name;
    attack.damage = damage;
    attack.resource = resource;

    dataSource
      .getRepository(Attack)
      .save(attack)
      .then((response) => res.status(201).json(response));
  };

  getAttacks = async (req: Request, res: Response) => {
    return dataSource
      .getRepository(Attack)
      .find()
      .then((response) => res.status(200).json(response));
  };

  addAttackToCategory = async (req: Request, res: Response) => {
    const { attackId } = req.body;
    const { categoryId } = req.params;

    const category = await dataSource
      .getRepository(Category)
      .findOneByOrFail({ id: categoryId });

    const attack = await dataSource
      .getRepository(Attack)
      .findOneByOrFail({ id: attackId });

    category.attacks.push(attack);

    dataSource
      .getRepository(Category)
      .save(category)
      .then((response) => res.status(201).json(response));
  };
}

export default new AttackService();
