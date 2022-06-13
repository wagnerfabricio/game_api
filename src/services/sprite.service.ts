import { Request } from "express";
import { Sprite } from "../entities";
import { spriteRepository } from "../repositories";

interface awsFile extends Express.Multer.File {
  fieldname: string;
  location: string;
}
class SpriteService {
  create = async (req: Request): Promise<Sprite[]> => {
    const files = req.files as awsFile[];

    const sprites: Sprite[] = files.map((file) => {
      return {
        name: file.fieldname,
        url: file.location,
      };
    });

    await spriteRepository.saveMany(sprites);

    return sprites;
  };

  getAll = async (): Promise<Sprite[]> => {
    return await spriteRepository.getAll();
  };
}

export default new SpriteService();
