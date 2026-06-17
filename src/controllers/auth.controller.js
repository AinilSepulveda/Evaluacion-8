import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        codigo: 400,
        message: "Email y password son obligatorios",
      });
    }

    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({
        codigo: 401,
        message: "Credenciales invalidas",
      });
    }

    if (password !== usuario.password) {
      return res.status(401).json({
        codigo: 401,
        message: "Credenciales invalidas",
      });
    }

    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    return res.status(200).json({
      codigo: 200,
      message: "Login exitoso",
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    next(error);
  }
};
