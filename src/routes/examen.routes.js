import { Router } from "express";
import { listarExamenes, subirExamen } from "../controllers/examen.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { subirPdf } from "../middlewares/upload.middleware.js";

const router = Router();

router.use(verificarToken);

router.get("/", listarExamenes);
router.post("/", subirPdf, subirExamen);

export default router;
