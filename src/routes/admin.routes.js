import { Router } from "express";
import { register, login, logout, profile, getUsers, getUser, BANuser, getWalker, getWalkers, BANwalker } from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post("/register",validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/profile", authRequired, profile);
router.post("/logout", logout);

router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.get("/BAN/user/:id", BANuser);

router.get("/walkers/:id", getWalker);
router.get("/walkers", getWalkers);
router.get("/BAN/walker/:id", BANwalker);




export default router; 
