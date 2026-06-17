const unknownEndpoint = (req, res) => {
  console.log("Ruta no encontrada:", req.method, req.url);

  res.status(404).json({
    codigo: 404,
    error: "Ruta no encontrada",
    ruta: req.url,
    metodo: req.method
  });
}

export default unknownEndpoint;
