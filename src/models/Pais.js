// Importamos los tipos de datos de Sequelize
// Ejemplo: INTEGER, STRING, DOUBLE, etc.
import { DataTypes } from "sequelize";

// Importamos la conexión configurada con PostgreSQL
import sequelize from "../config/db.js";

// Definimos el modelo Pais
// Este modelo representa la tabla "pais" en PostgreSQL
const Pais = sequelize.define(
  "Pais",
  {
    // Columna id
    // Es la clave primaria de la tabla
    // Se incrementa automáticamente
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // Columna nombre
    // Guarda el nombre del país
    // Es obligatorio, por eso allowNull es false
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    // Columna codigo_iso
    // Guarda el código ISO del país, por ejemplo: CL, PE, AR
    // unique: true evita que se repita el mismo código en más de un país
    codigo_iso: {
      type: DataTypes.STRING(10),
      unique: true,
    },

    // Columna poblacion
    // Guarda la población estimada del país
    poblacion: {
      type: DataTypes.INTEGER,
    },

    // Columna area
    // Guarda el área o superficie del país
    // DOUBLE permite almacenar números decimales
    area: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    // Indicamos el nombre real de la tabla en PostgreSQL
    tableName: "pais",

    // Desactivamos timestamps porque la tabla no tiene createdAt ni updatedAt
    timestamps: false,
  }
);

// Exportamos el modelo para poder usarlo en otros archivos
export default Pais;