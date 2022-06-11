import { Request } from "express";
import { Sprite } from "../entities";
import { spriteRepository } from "../repositories";

class SpriteService {
  create = async ({ validated }: Request): Promise<Sprite> => {
    const sprite = await spriteRepository.save(validated as Sprite);

    return sprite;
  };

  getAll = async (): Promise<Sprite[]> => {
    return await spriteRepository.getAll();
  };
}

export default new SpriteService();
