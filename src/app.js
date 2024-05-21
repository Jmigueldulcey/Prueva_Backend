import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import petWalkerRoutes from "./routes/petWalker.routes.js";
import petRoutes from "./routes/pet.routes.js";
import requestRoutes from "./routes/requests.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api", petRoutes);
app.use("/walker", petWalkerRoutes);
app.use("/api", requestRoutes); 

export default app;
