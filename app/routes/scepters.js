import { Router } from "express";
import { getScepters } from "../controllers/sceptersController.js";

const router = Router();

router.get("/scepters", getScepters );

export default router;