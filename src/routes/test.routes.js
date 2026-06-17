import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Ruta test funcionando");
});

export default router;
