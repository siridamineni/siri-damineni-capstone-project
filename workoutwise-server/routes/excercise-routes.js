import express from "express";
import * as excerciseController from "../controllers/excercise-controller.js";
const router = express.Router();

router.route("/excercises").get(excerciseController.getAllExcercises);
router.route("/excercises/:id").get(excerciseController.getExcerciseById);
router.route("/categories").get(excerciseController.getAllCategories);
router.route("/intensities").get(excerciseController.getAllIntensityLevels);
router.route("/body-region").get(excerciseController.getAllBodyRegion);
router
  .route("/all-category-exercises")
  .get(excerciseController.getAllCategoryExercises);

export default router;
