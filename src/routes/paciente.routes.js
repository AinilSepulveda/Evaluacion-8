import { Router } from "express";
import {
  actualizarPaciente,
  crearPaciente,
  eliminarPaciente,
  listarPacientes,
  obtenerPacientePorId,
} from "../controllers/paciente.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verificarToken);

router.get("/", listarPacientes);
router.get("/:id", obtenerPacientePorId);
router.post("/", crearPaciente);
router.put("/:id", actualizarPaciente);
router.delete("/:id", eliminarPaciente);

export default router;
