import { Persona } from "./Persona.js";

export class Paciente extends Persona {
  constructor({
    id,
    nombre,
    rut,
    edad,
    telefono = "",
    email = "",
    diagnostico,
    previsional = "",
  }) {
    super({ id, nombre, telefono, email });
    this.rut = rut;
    this.edad = Number(edad);
    this.diagnostico = diagnostico;
    this.previsional = previsional;
  }
}
