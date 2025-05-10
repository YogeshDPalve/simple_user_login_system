import { Router } from "express";
import {
  getUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendResetOtp,
  userLogin,
} from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";
import {
  validateLogin,
  validateRegistration,
  validateResetPassword,
  validateSendOtp,
} from "../validations/validationMiddleware";
import { ValidationChain } from "express-validator";

const router: Router = Router();

router.post(
  "/register",
  validateRegistration as ValidationChain[],
  registerUser
);
router.post("/login", validateLogin as ValidationChain[], userLogin);
router.post("/send-otp", validateSendOtp as ValidationChain[], sendResetOtp);
router.put(
  "/reset-password",
  validateResetPassword as ValidationChain[],
  resetPassword
);

router.get("/", authMiddleware, getUser);
router.get("/logout", authMiddleware, logoutUser);
export default router;
