import "express-async-errors";
import express from "express";
import cors from "cors";

import appRoutes from "./routes";
import { errorHandler } from "./errors";

const app = express();

app.use(cors());

app.use(express.json());
appRoutes(app);
app.use(errorHandler);

export default app;
