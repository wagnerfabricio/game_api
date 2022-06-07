import { Express } from "express";
import helloRoutes from './hello_word.route'

const appRoutes = (app: Express) => {
  app.use("/api/hello", helloRoutes);
};

export default appRoutes;