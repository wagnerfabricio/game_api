import { Request, Response } from "express";
import dataSource from "../data-source";
import { Attack } from "../entities";

class AttackService {
  addAttack = async (req: Request, res: Response) => {
    const { name, power, accuracy, hits, type } = req.body;

    const attack = new Attack();

    attack.name = name;
    attack.power = power;
    attack.accuracy = accuracy;
    attack.hits = hits;
    attack.type = type;

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
}

export default new AttackService();
