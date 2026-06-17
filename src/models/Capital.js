// Importamos los tipos de datos de Sequelize
// Ejemplo: INTEGER, STRING, DOUBLE, etc.
import { DataTypes } from "sequelize";

// Importamos la conexión configurada con PostgreSQL
import sequelize from "../config/db.js";

// Importamos el modelo Pais porque Capital se relaciona con Pais
import Pais from "./Pais.js";

// Definimos el modelo Capital
// Este modelo representa la tabla "capital" en PostgreSQL
const Capital = sequelize.define(
  "Capital",
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
    // Guarda el nombre de la capital
    // Es obligatorio, por eso allowNull es false
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    // Columna pais_id
    // Esta columna conecta Capital con Pais
    // Es una clave foránea hacia la tabla pais
    pais_id: {
      type: DataTypes.INTEGER,

      // unique: true permite que un país tenga solo una capital
      // Esto ayuda a representar una relación Uno a Uno
      unique: true,

      // references indica a qué modelo y a qué columna apunta esta FK
      references: {
        model: Pais,
        key: "id",
      },

      // Si se elimina un país, también se elimina su capital asociada
      onDelete: "CASCADE",
    },

    // Columna poblacion
    // Guarda la población estimada de la capital
    poblacion: {
      type: DataTypes.INTEGER,
    },

    // Columna area
    // Guarda el área de la capital
    area: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    // Indicamos el nombre real de la tabla en PostgreSQL
    tableName: "capital",

    // Desactivamos timestamps porque la tabla no tiene createdAt ni updatedAt
    timestamps: false,
  }
);

// Exportamos el modelo para poder usarlo en otros archivos
export default Capital;