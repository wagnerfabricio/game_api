import { Router } from "express";
import { attackController } from "../controllers";

import { verifyAdm, verifyToken } from "../middlewares";

const attackRoutes = Router();

attackRoutes.post("/admin", verifyToken, verifyAdm, attackController.create);
attackRoutes.get("", verifyToken, attackController.getAll);

export default attackRoutes;
