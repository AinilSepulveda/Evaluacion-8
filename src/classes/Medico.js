import { Persona } from "./Persona.js";

export class Medico extends Persona {
  constructor({
    id,
    nombre,
    especialidad,
    email,
    telefono = "",
    registroMedico,
  }) {
    super({ id, nombre, telefono, email });
    this.especialidad = especialidad;
    this.registroMedico = registroMedico;
  }
}
