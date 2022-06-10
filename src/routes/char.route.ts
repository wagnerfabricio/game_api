import { Router } from "express";
import { attackService, categoryService } from "../services";
import { charController } from "../controllers";

const charRoutes = Router();

charRoutes.post("/admin", charController.create);
charRoutes.get("", charController.getAll);
charRoutes.patch("/admin/:id", charController.update);
charRoutes.post("/admin/attack", attackService.addAttack);
charRoutes.get("/attack", attackService.getAttacks);
charRoutes.post("/admin/category", categoryService.addCategory);
charRoutes.get("/categories", categoryService.getCategories);
charRoutes.patch(
  "/admin/category/:categoryId",
  attackService.addAttackToCategory
);
charRoutes.post("/categories/attack", categoryService.getCategoryByAttack);

export default charRoutes;
