import { Router } from "express";
import {
  charController,
  attackController,
  spriteController,
} from "../controllers";

const charRoutes = Router();

charRoutes.post("/admin", charController.create);
charRoutes.get("", charController.getAll);
charRoutes.patch("/admin/:id", charController.update);
charRoutes.post("/admin/attack", attackController.create);
charRoutes.get("/attack", attackController.getAll);
charRoutes.post("/admin/sprites", spriteController.create);
charRoutes.get("/sprites", spriteController.getAll);

export default charRoutes;
