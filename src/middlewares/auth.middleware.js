import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      codigo: 401,
      message: "Token no proporcionado",
    });
  }

  const [tipo, token] = authHeader.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({
      codigo: 401,
      message: "Formato de token invalido. Use Bearer token",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        codigo: 401,
        message: "Token expirado",
      });
    }

    return res.status(401).json({
      codigo: 401,
      message: "Token invalido",
    });
  }
};
