import { Router } from "express";
import { spriteController } from "../controllers";
import {
  verifyAdm,
  verifyToken,
  multerMiddleware,
  verifyValidFile,
} from "../middlewares";

const spriteRoutes = Router();

spriteRoutes.post(
  "/admin",
  verifyToken,
  verifyAdm,
  multerMiddleware.uploadFile.any(),
  verifyValidFile,
  spriteController.create
);
spriteRoutes.get("", verifyToken, spriteController.getAll);

export default spriteRoutes;
