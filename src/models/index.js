// Importamos el modelo Pais
// Representa la tabla "pais" en PostgreSQL
import Pais from "./Pais.js";

// Importamos el modelo Capital
// Representa la tabla "capital" en PostgreSQL
import Capital from "./Capital.js";

// La idea es que después podamos importar Usuario desde:
import Usuario from "./Usuario.js";

// =====================================================
// Definición de relación Uno a Uno
// =====================================================

// Un país tiene una capital
// Ejemplo: Chile tiene como capital Santiago
Pais.hasOne(Capital, {
  // La clave foránea está en la tabla capital
  // Esta columna guarda el id del país asociado
  foreignKey: "pais_id",

  // Alias para consultar la capital de un país
  // Permite usar include con as: "capital"
  as: "capital",

  // Si se elimina un país, también se elimina su capital asociada
  onDelete: "CASCADE",
});

// Una capital pertenece a un país
// Ejemplo: Santiago pertenece a Chile
Capital.belongsTo(Pais, {
  // La clave foránea que conecta Capital con Pais
  foreignKey: "pais_id",

  // Alias para consultar el país de una capital
  // Permite usar include con as: "pais"
  as: "pais",
});

// Exportamos los modelos ya relacionados
// Así otros archivos pueden importarlos desde un solo lugar
export { Pais, Capital, Usuario };