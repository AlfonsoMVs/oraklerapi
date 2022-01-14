import { Router } from "express";
import { getCovens } from "../controllers/covensController.js";

const router = Router();

router.get("/covens", getCovens );

export default router;