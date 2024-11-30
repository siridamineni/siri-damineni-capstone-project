import express from "express";
import * as userDataController from "../controllers/user-data-controller.js";
const router = express.Router();

router.route("/user-data").post(userDataController.createUserData);
router.route("/user-data/:id").get(userDataController.getUserDataByuserId);
export default router;
