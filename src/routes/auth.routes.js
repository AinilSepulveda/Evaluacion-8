// POST /login
// src/routes/auth.routes.js
import express from "express";
import { login } from "../controllers/auth.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);

router.get("/perfil", verificarToken, (req, res) => {
  res.status(200).json({
    codigo: 200,
    message: "Token valido",
    usuario: req.usuario,
  });
});

export default router;
