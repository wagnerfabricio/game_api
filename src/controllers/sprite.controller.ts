import { Request, Response } from "express";
import { spriteService } from "../services";

class SpriteController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const newSprite = await spriteService.create(req);
    return res.status(201).json(newSprite);
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const sprites = await spriteService.getAll();
    return res.status(200).json(sprites);
  };
}

export default new SpriteController();
