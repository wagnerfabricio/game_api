import { Request, Response, Router } from "express";
import {
  charController,
  attackController,
  spriteController,
} from "../controllers";
import { multerMiddleware, verifyValidFile } from "../middlewares";

import { validateSchema, verifyAdm, verifyToken } from "../middlewares";
import { charSchema } from "../schemas";

const charRoutes = Router();

<<<<<<< HEAD
charRoutes.post(
  "/admin",
  verifyToken,
  validateSchema(charSchema),
  charController.createUserChar
);
charRoutes.post("", verifyToken, charController.createUserChar);
// charRoutes.get("", verifyToken, charController.getAll);
// charRoutes.get("/:id", verifyToken, charController.retrieve);
charRoutes.patch("/admin/:id", verifyToken, verifyAdm, charController.update);
charRoutes.patch("/:id", verifyToken, charController.update); // criar update do char que o user pode alterar
charRoutes.post(
  "/admin/attack",
  verifyToken,
  verifyAdm,
  attackController.create
);
charRoutes.get("/attack", verifyToken, attackController.getAll);
charRoutes.post(
  "/admin/sprites",
  verifyToken,
  verifyAdm,
  spriteController.create
);
charRoutes.get("/sprites", verifyToken, spriteController.getAll);
=======
charRoutes.post("/admin", charController.create);
charRoutes.get("", charController.getAll);
charRoutes.patch("/admin/:id", charController.update);
charRoutes.post("/admin/attack", attackController.create);
charRoutes.get("/attack", attackController.getAll);
charRoutes.post(
  "/admin/sprites",
  multerMiddleware.uploadFile.any(),
  verifyValidFile,
  spriteController.create
);
charRoutes.get("/sprites", spriteController.getAll);
>>>>>>> develop

export default charRoutes;
