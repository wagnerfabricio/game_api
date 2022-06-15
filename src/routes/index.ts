import { Express } from "express";
import helloRoutes from "./hello_word.route";
import userRoute from "./user.route";
import charRoutes from "./char.route";
import battleRoutes from "./battle.route";

const appRoutes = (app: Express) => {
  app.use("/api/hello", helloRoutes);
  app.use("/api/users", userRoute);
  app.use("/api/chars", charRoutes);
  app.use("/api/battle", battleRoutes);
};

export default appRoutes;
