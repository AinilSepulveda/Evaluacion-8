import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


// Para esta actividad didáctica podemos 
// comparar password en texto plano. 
// En producción, este campo debería estar 
// encriptado con bcrypt.
const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "admin",
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

export default Usuario;