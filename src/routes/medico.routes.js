import { Router } from "express";
import {
  actualizarMedico,
  crearMedico,
  eliminarMedico,
  listarMedicos,
  obtenerMedicoPorId,
} from "../controllers/medico.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verificarToken);

router.get("/", listarMedicos);
router.get("/:id", obtenerMedicoPorId);
router.post("/", crearMedico);
router.put("/:id", actualizarMedico);
router.delete("/:id", eliminarMedico);

export default router;
