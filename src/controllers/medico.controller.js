import { medicos } from "../data/medicos.data.js";
import { Medico } from "../classes/Medico.js";

const camposObligatorios = ["nombre", "especialidad", "email", "registroMedico"];

const validarMedico = (body) => {
  const faltantes = camposObligatorios.filter((campo) => {
    const valor = body[campo];
    return valor === undefined || valor === null || valor === "";
  });

  if (faltantes.length > 0) {
    return `Faltan campos obligatorios: ${faltantes.join(", ")}`;
  }

  if (!String(body.email).includes("@")) {
    return "El email debe tener un formato valido";
  }

  return null;
};

const obtenerId = (req) => Number(req.params.id);

export const listarMedicos = (req, res) => {
  res.status(200).json({
    codigo: 200,
    message: "Medicos obtenidos correctamente",
    total: medicos.length,
    data: medicos,
  });
};

export const obtenerMedicoPorId = (req, res) => {
  const id = obtenerId(req);
  const medico = medicos.find((item) => item.id === id);

  if (!medico) {
    return res.status(404).json({
      codigo: 404,
      message: "Medico no encontrado",
    });
  }

  return res.status(200).json({
    codigo: 200,
    message: "Medico obtenido correctamente",
    data: medico,
  });
};

export const crearMedico = (req, res) => {
  const errorValidacion = validarMedico(req.body);

  if (errorValidacion) {
    return res.status(400).json({
      codigo: 400,
      message: errorValidacion,
    });
  }

  const emailDuplicado = medicos.some((item) => item.email === req.body.email);
  const registroDuplicado = medicos.some(
    (item) => item.registroMedico === req.body.registroMedico
  );

  if (emailDuplicado || registroDuplicado) {
    return res.status(400).json({
      codigo: 400,
      message: "Ya existe un medico con ese email o registro medico",
    });
  }

  const nuevoMedico = new Medico({
    id: medicos.length > 0 ? Math.max(...medicos.map((item) => item.id)) + 1 : 1,
    nombre: req.body.nombre,
    especialidad: req.body.especialidad,
    email: req.body.email,
    telefono: req.body.telefono || "",
    registroMedico: req.body.registroMedico,
  });

  medicos.push(nuevoMedico);

  return res.status(201).json({
    codigo: 201,
    message: "Medico creado correctamente",
    data: nuevoMedico,
  });
};

export const actualizarMedico = (req, res) => {
  const id = obtenerId(req);
  const indice = medicos.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      codigo: 404,
      message: "Medico no encontrado",
    });
  }

  const medicoActualizado = new Medico({
    ...medicos[indice],
    ...req.body,
    id,
  });

  const errorValidacion = validarMedico(medicoActualizado);

  if (errorValidacion) {
    return res.status(400).json({
      codigo: 400,
      message: errorValidacion,
    });
  }

  const duplicado = medicos.some(
    (item) =>
      item.id !== id &&
      (item.email === medicoActualizado.email ||
        item.registroMedico === medicoActualizado.registroMedico)
  );

  if (duplicado) {
    return res.status(400).json({
      codigo: 400,
      message: "Ya existe otro medico con ese email o registro medico",
    });
  }

  medicos[indice].actualizar(medicoActualizado);

  return res.status(200).json({
    codigo: 200,
    message: "Medico actualizado correctamente",
    data: medicos[indice],
  });
};

export const eliminarMedico = (req, res) => {
  const id = obtenerId(req);
  const indice = medicos.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      codigo: 404,
      message: "Medico no encontrado",
    });
  }

  const [medicoEliminado] = medicos.splice(indice, 1);

  return res.status(200).json({
    codigo: 200,
    message: "Medico eliminado correctamente",
    data: medicoEliminado,
  });
};
