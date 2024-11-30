import express from "express";
import * as userDataController from "../controllers/user-data-controller.js";
const router = express.Router();

router.route("/user-data").post(userDataController.createUserData);
router.route("/user-data/:userId").get(userDataController.getUserDataByuserId);
router
  .route("/user-details/:id")
  .get(userDataController.getUserDataById)
  .delete(userDataController.deleteUserDataById)
  .put(userDataController.updateUserDataById);
router
  .route("/all-user-data/:id")
  .get(userDataController.getAllUserDataByUserId);
export default router;
