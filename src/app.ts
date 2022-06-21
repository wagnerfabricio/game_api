import "express-async-errors";
import express from "express";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import appRoutes from "./routes";
import { errorHandler } from "./errors";

const app = express();

app.use(cors());

app.use(express.json());
appRoutes(app);
app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);
app.use(errorHandler);

export default app;
