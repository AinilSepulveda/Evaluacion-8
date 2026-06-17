import { Paciente } from "../classes/Paciente.js";

export const pacientes = [
  new Paciente({
    id: 1,
    nombre: "Camila Rojas",
    rut: "12.345.678-9",
    edad: 34,
    telefono: "+56912345678",
    email: "camila.rojas@example.com",
    diagnostico: "Control general",
    previsional: "Fonasa",
  }),
  new Paciente({
    id: 2,
    nombre: "Matias Soto",
    rut: "18.765.432-1",
    edad: 42,
    telefono: "+56987654321",
    email: "matias.soto@example.com",
    diagnostico: "Hipertension arterial",
    previsional: "Isapre",
  }),
];
