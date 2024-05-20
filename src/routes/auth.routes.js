import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { uploadUser } from "../middlewares/from-users.js";
import { upload } from "../middlewares/from-simple.js";


const router = Router();


router.post("/register",uploadUser.single("foto_perfil"), validateSchema(registerSchema), register);
router.post("/login",upload.none(), validateSchema(loginSchema),    login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

export default router;
