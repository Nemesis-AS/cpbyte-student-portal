import express from "express";
import { config } from "dotenv";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import coordinatorRoutes from "./routes/coordinator.route.js";
import settingsRoutes from "./routes/settings.route.js";
import adminRoutes from "./routes/admin.route.js";

import cors from "cors"

import errorHandler from "./utils/errorHandler.js";

config();

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/coordinator", coordinatorRoutes);

app.use("/api/v1/settings", settingsRoutes);

app.use("/api/v1/admin", adminRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
