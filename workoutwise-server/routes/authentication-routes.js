import express from "express";
import * as authenticationController from "../controllers/authentication-controller.js";
const router = express.Router();

router.route("/register").post(authenticationController.createUser);

export default router;
