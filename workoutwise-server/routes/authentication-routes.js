import express from "express";
import * as authenticationController from "../controllers/authentication-controller.js";
const router = express.Router();

router.route("/register").post(authenticationController.createUser);
router.route("/authenticate").post(authenticationController.authenticate);

export default router;
