import sequelize from "../config/db.js";

export const checkDB = async () => {
  // aunthenticate () 
  await sequelize.authenticate();
};
