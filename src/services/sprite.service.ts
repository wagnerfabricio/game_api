import { Request, Response } from "express";
import dataSource from "../data-source";
import { Sprite } from "../entities";

class SpriteService {
  addSprite = async (req: Request, res: Response) => {
    const { name, url } = req.body;

    const sprite = new Sprite();

    sprite.name = name;
    sprite.url = url;

    dataSource
      .getRepository(Sprite)
      .save(sprite)
      .then((response) => res.status(201).json(response));
  };

  getSprites = async (req: Request, res: Response) => {
    return dataSource
      .getRepository(Sprite)
      .find()
      .then((response) => res.status(200).json(response));
  };
}

export default new SpriteService();
