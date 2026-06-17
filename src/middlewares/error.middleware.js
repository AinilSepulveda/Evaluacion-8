export const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err.message);

  res.status(500).json({
    codigo: 500,
    message: "Error interno del servidor",
    error: err.message,
  });
};
