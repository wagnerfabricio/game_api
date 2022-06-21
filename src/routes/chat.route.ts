import { Router } from "express";
import { chatController } from "../controllers";
import { verifyToken } from "../middlewares";

const chatRoutes = Router();

chatRoutes.post("/", verifyToken, chatController.sendMessage);
chatRoutes.post("/pusher/auth", verifyToken, chatController.auth);

export default chatRoutes;
