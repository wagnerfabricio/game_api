import { Router } from "express";

import { userController } from "../controllers";

const userRoute = Router();

userRoute.post("/register", userController.insertUser);

export default userRoute;
