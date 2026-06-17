import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";

const router = Router();

// Definimos endpoint /health
router.get("/", healthCheck);

export default router;