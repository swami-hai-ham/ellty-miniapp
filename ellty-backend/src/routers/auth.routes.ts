import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/registerSchema.js";
import { LoginController, RegisterController } from "../controllers/auth.controller.js";


const router = Router()

router.post("/register",validate(registerSchema, "body"), RegisterController);
router.post("/login", validate(loginSchema, "body"), LoginController);

export default router;