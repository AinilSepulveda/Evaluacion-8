import { Router } from "express";
import { obtenerAcerca } from "../controllers/acerca.controller.js";

const router = Router();

router.get("/", obtenerAcerca);

export default router;
