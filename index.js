import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";
import { Pais, Capital } from "./src/models/index.js";

dotenv.config();

const app = express();

// Configuracion de entorno
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Ruta base
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

    res.json({
      message: "Países obtenidos correctamente",
      data: paises,
    });
  } catch (error) {
    next(error);
  }
});


// Registrando authRoutes
app.use("/api/v1/auth", authRoutes);

// // Middleware 404
app.use(unknownEndpoint);

// Middleware global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
