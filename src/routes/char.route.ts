import { Router } from "express";
import { attackService, spriteService } from "../services";
import { charController } from "../controllers";

const charRoutes = Router();

charRoutes.post("/admin", charController.create);
charRoutes.get("", charController.getAll);
charRoutes.patch("/admin/:id", charController.update);
charRoutes.post("/admin/attack", attackService.addAttack);
charRoutes.get("/attack", attackService.getAttacks);
charRoutes.post("/admin/sprites", spriteService.addSprite);
charRoutes.get("/sprites", spriteService.getSprites);

export default charRoutes;
