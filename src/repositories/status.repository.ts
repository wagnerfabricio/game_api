import { Repository, UpdateResult } from "typeorm";
import AppDataSource from "../data-source";
import { Status } from "../entities";

interface ICharRepository {
  save: (payload: Partial<Status>) => Promise<Status>;
  getAll: () => Promise<Status[]>;
  retrieve: (payload: object) => Promise<Status>;
  update: (id: string, payload: Partial<Status>) => Promise<UpdateResult>;
}

class StatusRepository implements ICharRepository {
  private statusRepo: Repository<Status>;

  constructor() {
    this.statusRepo = AppDataSource.getRepository(Status);
  }

  save = async (payload: Partial<Status>) => {
    return await this.statusRepo.save(payload);
  };

  getAll = async () => {
    return this.statusRepo.find();
  };

  retrieve = async (payload: object) => {
    return this.statusRepo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<Status>) => {
    return await this.statusRepo.update(id, { ...payload });
  };
}

export default new StatusRepository();
