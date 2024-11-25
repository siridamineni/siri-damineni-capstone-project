import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import excerciseRoutes from "./routes/excercise-routes.js";
import authenticationRoutes from "./routes/authentication-routes.js";
const app = express();
const port = process.env.PORT || 3000;

// all routes
app.use(express.json());
app.use(cors());
app.use("/api", excerciseRoutes);
app.use("/api", authenticationRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
