import { Repository, UpdateResult } from "typeorm";
import AppDataSource from "../data-source";
import { Sprite } from "../entities";

interface ISpriteRepository {
  save: (payload: Partial<Sprite>) => Promise<Sprite>;
  getAll: () => Promise<Sprite[]>;
  retrieve: (payload: object) => Promise<Sprite>;
  update: (id: string, payload: Partial<Sprite>) => Promise<UpdateResult>;
}

class SpriteRepository implements ISpriteRepository {
  private spriteRepo: Repository<Sprite>;

  constructor() {
    this.spriteRepo = AppDataSource.getRepository(Sprite);
  }

  save = async (payload: Partial<Sprite>) => {
    return await this.spriteRepo.save(payload);
  };

  saveMany = async (payload: Partial<Sprite[]>) => {
    const insertedSprite = await this.spriteRepo
      .createQueryBuilder()
      .insert()
      .values(payload)
      .execute();

    const returnSprites: Sprite[] = [];

    for (let { id } of insertedSprite.generatedMaps) {
      returnSprites.push(await this.spriteRepo.findOneBy({ id }));
    }

    return returnSprites;
  };

  getAll = async () => {
    return this.spriteRepo.find();
  };

  retrieve = async (payload: object) => {
    return this.spriteRepo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<Sprite>) => {
    return await this.spriteRepo.update(id, { ...payload });
  };

  delete = async (payload: Sprite) => {
    await this.spriteRepo.remove(payload);
    return;
  };
}

export default new SpriteRepository();
