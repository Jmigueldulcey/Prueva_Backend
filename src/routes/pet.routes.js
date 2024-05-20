import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
} from "../controllers/pet.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPetShema } from "../schemas/pet.schema.js";
import { upload } from "../middlewares/from-pets.js";


const router = Router();

router.get("/pet", authRequired, getPets);

router.get("/pet/:id", authRequired, getPet);

router.post("/pet",upload.single("imagen"), authRequired, validateSchema(createPetShema), createPet);

router.delete("/pet/:id", authRequired, deletePet);

router.put("/pet/:id",upload.single("imagen"), authRequired, updatePet);

export default router;
