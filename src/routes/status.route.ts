import { Router } from "express";
import { statusController } from "../controllers";

import { verifyAdm, verifyToken } from "../middlewares";

const statusRoutes = Router();

statusRoutes.post("/admin", verifyToken, verifyAdm, statusController.create);
statusRoutes.get("", verifyToken, statusController.getAll);
statusRoutes.get("/:id", verifyToken, statusController.retrieve);
statusRoutes.patch(
  "/admin/:id",
  verifyToken,
  verifyAdm,
  statusController.update
);

export default statusRoutes;
