import { Router } from "express";
import { getWizards } from "../controllers/wizardsController.js";

const router = Router();

router.get("/wizards", getWizards );

export default router;