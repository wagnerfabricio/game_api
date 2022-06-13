import { Request, Response, Router } from "express";
import {
  charController,
  attackController,
  spriteController,
} from "../controllers";
import { multerMiddleware, verifyValidFile } from "../middlewares";

const charRoutes = Router();

charRoutes.post("/admin", charController.create);
charRoutes.get("", charController.getAll);
charRoutes.patch("/admin/:id", charController.update);
charRoutes.post("/admin/attack", attackController.create);
charRoutes.get("/attack", attackController.getAll);
charRoutes.post(
  "/admin/sprites",
  multerMiddleware.uploadFile.single("file"),
  verifyValidFile,
  spriteController.create
);
charRoutes.get("/sprites", spriteController.getAll);

export default charRoutes;
