import fs from "fs/promises";
import path from "path";

const carpetaExamenes = path.resolve("uploads", "examenes");

export const subirExamen = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      codigo: 400,
      message: "Debe enviar un archivo PDF en el campo archivo",
    });
  }

  return res.status(201).json({
    codigo: 201,
    message: "Examen PDF subido correctamente",
    data: {
      nombreOriginal: req.file.originalname,
      nombreArchivo: req.file.filename,
      tipo: req.file.mimetype,
      tamanioBytes: req.file.size,
    },
  });
};

export const listarExamenes = async (req, res, next) => {
  try {
    await fs.mkdir(carpetaExamenes, { recursive: true });
    const archivos = await fs.readdir(carpetaExamenes);
    const pdfs = archivos.filter((archivo) => path.extname(archivo).toLowerCase() === ".pdf");

    return res.status(200).json({
      codigo: 200,
      message: "Archivos de examenes obtenidos correctamente",
      total: pdfs.length,
      data: pdfs,
    });
  } catch (error) {
    next(error);
  }
};
