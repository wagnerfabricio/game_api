import { NextFunction, Request, Response } from "express";
import { Sprite } from "../entities";
import { AppError } from "../errors";
import { spriteRepository } from "../repositories";
import { awsFile } from "../services/sprite.service";

const verifySpriteExists =
  (status: boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!status) {
      const { id } = req.params;
      const sprite = await spriteRepository.retrieve({ id });
      if (!sprite) {
        throw new AppError(404, "Sprite not found");
      }
      req.sprite = sprite;
      return next();
    }

    const existsFiles = [];

    for (const sprite of req.files as awsFile[]) {
      const { fieldname } = sprite;
      const exists = await spriteRepository.retrieve({ name: fieldname });
      if (exists) {
        existsFiles.push(fieldname);
      }
    }

    if (existsFiles.length > 0) {
      throw new AppError(400, {
        error: "Sprite already exists",
        names: existsFiles,
      });
    }

    return next();
  };

export default verifySpriteExists;
