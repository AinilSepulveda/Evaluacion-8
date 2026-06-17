import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import acercaRoutes from "./src/routes/acerca.routes.js";
import pacienteRoutes from "./src/routes/paciente.routes.js";
import medicoRoutes from "./src/routes/medico.routes.js";
import examenRoutes from "./src/routes/examen.routes.js";
import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";
import { Pais, Capital } from "./src/models/index.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    codigo: 200,
    message: "API Clinica Modulo 8 funcionando",
    endpoints: {
      acerca: "/api/v1/acerca",
      login: "/api/v1/auth/login",
    },
  });
});

app.use("/test", testRoutes);
app.use("/health", healthRoutes);

app.get("/paises", async (req, res, next) => {
  try {
    const paises = await Pais.findAll({
      include: {
        model: Capital,
        as: "capital",
      },
    });

    res.status(200).json({
      codigo: 200,
      message: "Paises obtenidos correctamente",
      data: paises,
    });
  } catch (error) {
    next(error);
  }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/acerca", acercaRoutes);
app.use("/api/v1/pacientes", pacienteRoutes);
app.use("/api/v1/medicos", medicoRoutes);
app.use("/api/v1/examenes", examenRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
