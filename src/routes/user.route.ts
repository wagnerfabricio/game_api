import { Router } from "express";

//controller
import { userController } from "../controllers";

//middleware
import {
  verifyUserExists,
  getUserOr404,
  verifyAdm,
  verifyToken,
  validateSchema,
  createAdmin,
} from "../middlewares";
import { userSchema } from "../schemas";

const userRoute = Router();

userRoute.post(
  "/register",
  validateSchema(userSchema.createUser),
  createAdmin,
  verifyUserExists,
  userController.insertUser
);
userRoute.post("/login", userController.login);
userRoute.get("/", verifyToken, verifyAdm, userController.getAllUsers);
userRoute.get(
  "/:id",
  verifyToken,
  verifyAdm,
  getUserOr404,
  userController.getUserById
);
userRoute.patch(
  "/:id",
  verifyToken,
  verifyAdm,
  getUserOr404,
  userController.updateUser
);
userRoute.delete(
  "/:id",
  verifyToken,
  verifyAdm,
  getUserOr404,
  userController.deleteUser
);

export default userRoute;
