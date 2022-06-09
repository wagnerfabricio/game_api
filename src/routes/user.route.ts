import { Router } from "express";

//controller
import { userController } from "../controllers";

//middleware
import { verifyUserExists, getUserOr404 } from "../middlewares";

const userRoute = Router();

userRoute.post("/register", verifyUserExists, userController.insertUser);
userRoute.get("/", userController.getAllUsers);
userRoute.get("/:id", getUserOr404, userController.getUserById);

export default userRoute;
