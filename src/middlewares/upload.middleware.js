import fs from "fs";
import path from "path";
import multer from "multer";

const carpetaExamenes = path.resolve("uploads", "examenes");

fs.mkdirSync(carpetaExamenes, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaExamenes);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const nombreBase = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "-");
    cb(null, `${Date.now()}-${nombreBase}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const esPdf = file.mimetype === "application/pdf" && extension === ".pdf";

  if (!esPdf) {
    return cb(new Error("Solo se permiten archivos PDF"));
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const subirPdf = (req, res, next) => {
  upload.single("archivo")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        codigo: 400,
        message: error.message,
      });
    }

    next();
  });
};
