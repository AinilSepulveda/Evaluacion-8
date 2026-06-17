import { checkDB } from "../services/health.service.js";

export const healthCheck = async (req, res, next) => {
  try {
    // Llama a la capa de servicio (no accede directo a DB)
    await checkDB();

    res.json({
      status: "ok",
      db: "connected",
      orm: "sequelize"
    });
  } catch (error) {
    next(error)
  }
};