import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/petWalker.controller.js";
import { acceptRequest } from "../controllers/request.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/petWalker.shema.js";
import { upload } from "../middlewares/from-simple.js";
import { uploadUser } from "../middlewares/from-users.js";

const router = Router();

router.post("/register",uploadUser.single("foto_perfil"), validateSchema(registerSchema), register);
router.post("/login",upload.none(), validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.put("/accept/:id",upload.none(), authRequired, acceptRequest);

export default router;
