import { Express } from "express";
import helloRoutes from "./hello_word.route";
import userRoute from "./user.route";

const appRoutes = (app: Express) => {
  app.use("/api/hello", helloRoutes);
  app.use("/user", userRoute);
};

export default appRoutes;
