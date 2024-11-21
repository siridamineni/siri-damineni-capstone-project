import express from "express";
import * as excerciseController from "../controllers/excercise-controller.js";
const router = express.Router();

router.route("/excercises").get(excerciseController.getAllExcercises);

export default router;
