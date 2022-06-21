import { Express } from "express";
import helloRoutes from "./hello_word.route";
import userRoute from "./user.route";
import charRoutes from "./char.route";
import battleRoutes from "./battle.route";
import attackRoutes from "./attack.route";
import spriteRoutes from "./sprite.route";
import statusRoutes from "./status.route";
import chatRoutes from "./chat.route";

const appRoutes = (app: Express) => {
  app.use("/api/hello", helloRoutes);
  app.use("/api/users", userRoute);
  app.use("/api/chars", charRoutes);
  app.use("/api/battle", battleRoutes);
  app.use("/api/attacks", attackRoutes);
  app.use("/api/sprites", spriteRoutes);
  app.use("/api/status", statusRoutes);
  app.use("/api/chat", chatRoutes);
};

export default appRoutes;
