import { Request } from "express";
import { Sprite } from "../entities";
import { spriteRepository } from "../repositories";
import { S3 } from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3();

export interface awsFile extends Express.Multer.File {
  fieldname: string;
  location: string;
  key: string;
}
class SpriteService {
  create = async (req: Request): Promise<Sprite[]> => {
    const files = req.files as awsFile[];

    const sprites: Sprite[] = files.map((file) => {
      return {
        name: file.fieldname,
        url: file.location,
        key: file.key,
      };
    });

    await spriteRepository.saveMany(sprites);

    return sprites;
  };

  getAll = async (): Promise<Sprite[]> => {
    return await spriteRepository.getAll();
  };

  delete = async ({ sprite }: Request): Promise<void> => {
    if (sprite.key) {
      s3.deleteObject({
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
        Key: sprite.key,
      }).promise();
    }
    await spriteRepository.delete(sprite);
    return;
  };
}

export default new SpriteService();
