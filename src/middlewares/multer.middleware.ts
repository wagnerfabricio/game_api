import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

import { v4 } from "uuid";
import { Request } from "express";

import { AppError } from "../errors";
import { s3 } from "../configs";

dotenv.config();

class MulterMiddleware {
  uploadFile = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req: Request, file, cb) => {
        cb(null, { fieldName: file.filename });
      },
      key: (req: Request, file, cb) => {
        cb(null, `${v4()}-${file.fieldname}  `);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 2,
    },
    fileFilter: (req: Request, file, cb) => {
      const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        throw new AppError(400, "Invalid file type");
      }
    },
  });
}

export default new MulterMiddleware();
