import { Repository, UpdateResult } from "typeorm";
import AppDataSource from "../data-source";
import { Char } from "../entities";

interface ICharRepository {
  save: (payload: Partial<Char>) => Promise<Char>;
  getAll: () => Promise<Char[]>;
  retrieve: (payload: object) => Promise<Char>;
  update: (id: string, payload: Partial<Char>) => Promise<UpdateResult>;
  getRandomChar: (level: number) => Promise<Char>;
}

class CharRepository implements ICharRepository {
  private charRepo: Repository<Char>;

  constructor() {
    this.charRepo = AppDataSource.getRepository(Char);
  }

  save = async (payload: Partial<Char>) => {
    return await this.charRepo.save(payload);
  };

  getAll = async () => {
    return this.charRepo.find();
  };

  retrieve = async (payload: object) => {
    return this.charRepo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<Char>) => {
    return await this.charRepo.update(id, { ...payload });
  };

  getRandomChar = async (level: number) => {
    const chars = await this.charRepo.find().then((chars) => {
      return chars.filter((char) => char.status.level === level);
    });
    const randomIndex = Math.floor(Math.random() * chars.length);

    return chars[randomIndex];
  };
}

export default new CharRepository();
