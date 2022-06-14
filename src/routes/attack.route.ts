import { Router } from "express";
import { attackController } from "../controllers";

import { validateSchema, verifyAdm, verifyToken } from "../middlewares";
import { attackSchema } from "../schemas";

const attackRoutes = Router();

attackRoutes.post(
  "/admin",
  verifyToken,
  verifyAdm,
  validateSchema(attackSchema.create),
  attackController.create
);
attackRoutes.get("", verifyToken, attackController.getAll);

export default attackRoutes;
