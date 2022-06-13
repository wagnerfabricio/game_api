import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

import { v4 } from "uuid";
import { Request } from "express";

import { s3 } from "../configs";

dotenv.config();

class MulterMiddleware {
  uploadFile = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req: Request, file: Express.Multer.File, cb: Function) => {
        if (!file) cb(null, false);

        cb(null, { fieldName: file.fieldname });
      },
      key: (req: Request, file: Express.Multer.File, cb: Function) => {
        const filename = `${v4()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 2,
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
      const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });
}

export default new MulterMiddleware();
