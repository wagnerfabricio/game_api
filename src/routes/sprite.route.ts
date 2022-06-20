import { Router } from "express";
import { spriteController } from "../controllers";
import {
  verifyAdm,
  verifyToken,
  multerMiddleware,
  verifyValidFile,
  verifySpriteExists,
} from "../middlewares";

const spriteRoutes = Router();

spriteRoutes.post(
  "/admin",
  verifyToken,
  verifyAdm,
  multerMiddleware.uploadFile.any(),
  verifyValidFile,
  verifySpriteExists(true),
  spriteController.create
);
spriteRoutes.get("", verifyToken, spriteController.getAll);
spriteRoutes.delete(
  "/:id",
  verifyToken,
  verifyAdm,
  verifySpriteExists(false),
  spriteController.delete
);

export default spriteRoutes;
