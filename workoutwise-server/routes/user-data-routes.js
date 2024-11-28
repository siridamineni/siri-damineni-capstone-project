import express from "express";
import * as userDataController from "../controllers/user-data-controller.js";
const router = express.Router();

router.route("/user-data").post(userDataController.createUserData);
export default router;
