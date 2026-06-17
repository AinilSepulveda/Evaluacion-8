import { checkDB } from "../services/health.service.js";

export const healthCheck = async (req, res, next) => {
  try {
    // Llama a la capa de servicio (no accede directo a DB)
    await checkDB();

    res.status(200).json({
      codigo: 200,
      status: "ok",
      db: "connected",
      orm: "sequelize"
    });
  } catch (error) {
    next(error)
  }
};
