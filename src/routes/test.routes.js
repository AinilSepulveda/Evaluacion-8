import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    codigo: 200,
    message: "Ruta test funcionando",
  });
});

export default router;
