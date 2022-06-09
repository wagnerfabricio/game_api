import { Express } from "express";
import charRoutes from "./char.route";
import helloRoutes from "./hello_word.route";

const appRoutes = (app: Express) => {
  app.use("/api/hello", helloRoutes);
  app.use("/api/chars", charRoutes);
};

export default appRoutes;
