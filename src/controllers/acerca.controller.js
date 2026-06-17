export const obtenerAcerca = (req, res) => {
  res.status(200).json({
    codigo: 200,
    nombre: "API Clinica Modulo 8",
    version: "1.0.0",
    descripcion:
      "API REST con Node.js y Express para gestionar pacientes, medicos y examenes PDF de una clinica.",
    acceso: {
      publico: ["POST /api/v1/auth/login", "GET /api/v1/acerca"],
      privado: [
        "GET /api/v1/pacientes",
        "GET /api/v1/pacientes/:id",
        "POST /api/v1/pacientes",
        "PUT /api/v1/pacientes/:id",
        "DELETE /api/v1/pacientes/:id",
      ],
    },
  });
};
