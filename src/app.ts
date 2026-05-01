import express from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", usersRoutes);

app.use(errorMiddleware);

export default app;
