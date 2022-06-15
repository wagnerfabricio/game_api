import "express-async-errors";
import express from "express";

import appRoutes from "./routes";
import { errorHandler } from "./errors";

const app = express();

app.use(express.json());
appRoutes(app);
app.use(errorHandler);

export default app;
