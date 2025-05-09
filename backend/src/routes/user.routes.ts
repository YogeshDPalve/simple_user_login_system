import { Router } from "express";
import {
  getUser,
  registerUser,
  userLogin,
} from "../controllers/student.controller";
import authMiddleware from "../middlewares/authMiddleware";
import {
  validateLogin,
  validateRegistration,
} from "../validations/validationMiddleware";
import { ValidationChain } from "express-validator";

const router: Router = Router();

router.post(
  "/register",
  validateRegistration as ValidationChain[],
  registerUser
);
router.post("/login", validateLogin as ValidationChain[], userLogin);
router.get("/", authMiddleware, getUser);

export default router;
