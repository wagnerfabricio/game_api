import { Repository, UpdateResult } from "typeorm";
import AppDataSource from "../data-source";
import { Attack } from "../entities";

interface IAttackRepository {
  save: (payload: Partial<Attack>) => Promise<Attack>;
  getAll: () => Promise<Attack[]>;
  retrieve: (payload: object) => Promise<Attack>;
  update: (id: string, payload: Partial<Attack>) => Promise<UpdateResult>;
}

class AttackRepository implements IAttackRepository {
  private attackRepo: Repository<Attack>;

  constructor() {
    this.attackRepo = AppDataSource.getRepository(Attack);
  }

  save = async (payload: Partial<Attack>) => {
    return await this.attackRepo.save(payload);
  };

  getAll = async () => {
    return this.attackRepo.find();
  };

  retrieve = async (payload: object) => {
    return this.attackRepo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<Attack>) => {
    return await this.attackRepo.update(id, { ...payload });
  };
}

export default new AttackRepository();
