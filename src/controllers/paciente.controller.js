import { pacientes } from "../data/pacientes.data.js";
import { Paciente } from "../classes/Paciente.js";

const camposObligatorios = ["nombre", "rut", "edad", "diagnostico"];

const validarPaciente = (body) => {
  const faltantes = camposObligatorios.filter((campo) => {
    const valor = body[campo];
    return valor === undefined || valor === null || valor === "";
  });

  if (faltantes.length > 0) {
    return `Faltan campos obligatorios: ${faltantes.join(", ")}`;
  }

  if (!Number.isInteger(Number(body.edad)) || Number(body.edad) < 0) {
    return "La edad debe ser un numero entero mayor o igual a 0";
  }

  if (body.email && !String(body.email).includes("@")) {
    return "El email debe tener un formato valido";
  }

  return null;
};

const obtenerId = (req) => Number(req.params.id);

export const listarPacientes = (req, res) => {
  res.status(200).json({
    codigo: 200,
    message: "Pacientes obtenidos correctamente",
    total: pacientes.length,
    data: pacientes,
  });
};

export const obtenerPacientePorId = (req, res) => {
  const id = obtenerId(req);
  const paciente = pacientes.find((item) => item.id === id);

  if (!paciente) {
    return res.status(404).json({
      codigo: 404,
      message: "Paciente no encontrado",
    });
  }

  return res.status(200).json({
    codigo: 200,
    message: "Paciente obtenido correctamente",
    data: paciente,
  });
};

export const crearPaciente = (req, res) => {
  const errorValidacion = validarPaciente(req.body);

  if (errorValidacion) {
    return res.status(400).json({
      codigo: 400,
      message: errorValidacion,
    });
  }

  const existeRut = pacientes.some((item) => item.rut === req.body.rut);

  if (existeRut) {
    return res.status(400).json({
      codigo: 400,
      message: "Ya existe un paciente con ese rut",
    });
  }

  const nuevoPaciente = new Paciente({
    id: pacientes.length > 0 ? Math.max(...pacientes.map((item) => item.id)) + 1 : 1,
    nombre: req.body.nombre,
    rut: req.body.rut,
    edad: Number(req.body.edad),
    telefono: req.body.telefono || "",
    email: req.body.email || "",
    diagnostico: req.body.diagnostico,
    previsional: req.body.previsional || "",
  });

  pacientes.push(nuevoPaciente);

  return res.status(201).json({
    codigo: 201,
    message: "Paciente creado correctamente",
    data: nuevoPaciente,
  });
};

export const actualizarPaciente = (req, res) => {
  const id = obtenerId(req);
  const indice = pacientes.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      codigo: 404,
      message: "Paciente no encontrado",
    });
  }

  const pacienteActualizado = new Paciente({
    ...pacientes[indice],
    ...req.body,
    id,
  });

  const errorValidacion = validarPaciente(pacienteActualizado);

  if (errorValidacion) {
    return res.status(400).json({
      codigo: 400,
      message: errorValidacion,
    });
  }

  const rutDuplicado = pacientes.some(
    (item) => item.id !== id && item.rut === pacienteActualizado.rut
  );

  if (rutDuplicado) {
    return res.status(400).json({
      codigo: 400,
      message: "Ya existe otro paciente con ese rut",
    });
  }

  pacienteActualizado.edad = Number(pacienteActualizado.edad);
  pacientes[indice].actualizar(pacienteActualizado);

  return res.status(200).json({
    codigo: 200,
    message: "Paciente actualizado correctamente",
    data: pacientes[indice],
  });
};

export const eliminarPaciente = (req, res) => {
  const id = obtenerId(req);
  const indice = pacientes.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      codigo: 404,
      message: "Paciente no encontrado",
    });
  }

  const [pacienteEliminado] = pacientes.splice(indice, 1);

  return res.status(200).json({
    codigo: 200,
    message: "Paciente eliminado correctamente",
    data: pacienteEliminado,
  });
};
