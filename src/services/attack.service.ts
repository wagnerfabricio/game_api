import { Request } from "express";
import { Attack } from "../entities";
import { attackRepository } from "../repositories";

class AttackService {
  create = async ({ validated }: Request): Promise<Attack> => {
    const attack = await attackRepository.save(validated as Attack);

    return attack;
  };

  getAll = async (): Promise<Attack[]> => {
    return await attackRepository.getAll();
  };
}

export default new AttackService();
