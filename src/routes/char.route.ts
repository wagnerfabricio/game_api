import { Router } from "express";
import { attackService, categoryService, charService } from "../services";

const charRoutes = Router();

charRoutes.post("/admin", charService.newChar);
charRoutes.get("", charService.getAll);
charRoutes.patch("/admin/:id", charService.update);
charRoutes.post("/admin/attack", attackService.addAttack);
charRoutes.get("/attack", attackService.getAttacks);
charRoutes.post("/admin/category", categoryService.addCategory);
charRoutes.get("/categories", categoryService.getCategories);
charRoutes.patch(
  "/admin/category/:categoryId",
  attackService.addAttackToCategory
);
charRoutes.post("/categories/attack", categoryService.getCategoryByAttack);
charRoutes.post("/admin/create_full_char", charService.createFullChar);

export default charRoutes;
