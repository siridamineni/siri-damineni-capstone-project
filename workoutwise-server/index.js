import "dotenv/config";
import express from "express";
import cors from "cors";
import excerciseRoutes from "./routes/excercise-routes.js";
const app = express();
const port = process.env.PORT || 3000;

// all routes
app.use(express.json());
app.use(cors());
app.use("/api", excerciseRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
