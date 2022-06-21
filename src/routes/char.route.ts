import { Router } from "express";
import { charController } from "../controllers";

import {
  validadeCreateChar,
  validateSchema,
  verifyAdm,
  verifyToken,
} from "../middlewares";
import { charSchema } from "../schemas";

const charRoutes = Router();

charRoutes.post(
  "/admin",
  verifyToken,
  validateSchema(charSchema.createChar),
  charController.createUserChar
);
charRoutes.post(
  "",
  verifyToken,
  validateSchema(charSchema.createChar),
  validadeCreateChar,
  charController.createUserChar
);
charRoutes.get("", verifyToken, charController.getAll);
// charRoutes.get("/:id", verifyToken, charController.retrieve);
charRoutes.get("/leaderboard", charController.leaderboard);
charRoutes.patch("/admin/:id", verifyToken, verifyAdm, charController.update);
charRoutes.patch("/:id", verifyToken, charController.update); // criar update do char que o user pode alterar
charRoutes.post(
  "/upgrade",
  verifyToken,
  validateSchema(charSchema.upgradeChar),
  charController.upgrade
);

export default charRoutes;
