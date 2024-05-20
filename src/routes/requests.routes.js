import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    createRequest,
    deleteRequest,
    getRequest,
    getRequests,
    updateRequest,
} from "../controllers/request.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRequestShema } from "../schemas/request.schema.js";
import { upload } from "../middlewares/from-simple.js";



const router = Router();

router.get("/request", authRequired, getRequests);
router.get("/request/:id", authRequired, getRequest);
router.post("/request",upload.none(), authRequired, validateSchema(createRequestShema), createRequest);
router.delete("/request/:id", authRequired, deleteRequest);
router.put("/request/:id",upload.none(), authRequired, updateRequest);


export default router;
