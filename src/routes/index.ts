import { Express } from "express";
import helloRoutes from "./hello_word.route";
import userRoute from "./user.route";
import charRoutes from "./char.route";

const appRoutes = (app: Express) => {
  app.use("/api/hello", helloRoutes);
  app.use("/users", userRoute);
  app.use("/api/chars", charRoutes);
};

export default appRoutes;
