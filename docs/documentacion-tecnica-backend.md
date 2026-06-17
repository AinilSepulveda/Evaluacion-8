# Documentacion Tecnica Backend - API Clinica Modulo 8

## 1. Objetivo

Implementar una API REST empresarial con Node.js y Express para gestionar informacion de una clinica. El backend permite autenticacion JWT, operaciones CRUD de pacientes y medicos, subida de examenes PDF y listado de archivos cargados al servidor.

## 2. Alcance Del Backend

El backend incluye:

- Endpoint publico de informacion general.
- Login con JWT.
- Middleware de autenticacion para rutas privadas.
- CRUD de pacientes en memoria.
- CRUD de medicos en memoria.
- Subida de examenes PDF.
- Listado de nombres de archivos subidos.
- Conexion PostgreSQL con Sequelize para usuarios.
- SQL inicial para crear la base de datos y usuario administrador.
- Pruebas funcionales mediante archivo `.rest`.

El frontend se desarrolla en otro repositorio y consume esta API por HTTP.

Repositorio frontend:

```text
https://github.com/AinilSepulveda/FrontEnd-medecina
```

Este repositorio backend no contiene la interfaz web. Para levantar o revisar el frontend se debe usar el repositorio anterior.

## 3. Requerimientos Funcionales

| ID | Requerimiento | Estado |
| --- | --- | --- |
| RF01 | El sistema debe permitir login de usuario administrador. | Implementado |
| RF02 | El sistema debe generar un token JWT al iniciar sesion correctamente. | Implementado |
| RF03 | El sistema debe exponer un endpoint publico `acerca`. | Implementado |
| RF04 | El sistema debe proteger rutas privadas con JWT. | Implementado |
| RF05 | El sistema debe listar pacientes. | Implementado |
| RF06 | El sistema debe crear pacientes. | Implementado |
| RF07 | El sistema debe actualizar pacientes. | Implementado |
| RF08 | El sistema debe eliminar pacientes. | Implementado |
| RF09 | El sistema debe listar medicos. | Implementado |
| RF10 | El sistema debe crear medicos. | Implementado |
| RF11 | El sistema debe actualizar medicos. | Implementado |
| RF12 | El sistema debe eliminar medicos. | Implementado |
| RF13 | El sistema debe permitir subir examenes solo en PDF. | Implementado |
| RF14 | El sistema debe listar nombres de archivos PDF subidos. | Implementado |
| RF15 | El sistema debe responder con codigos HTTP adecuados. | Implementado |

## 4. Requerimientos No Funcionales

| ID | Requerimiento | Descripcion |
| --- | --- | --- |
| RNF01 | Seguridad | Las rutas privadas requieren token JWT valido. |
| RNF02 | Mantenibilidad | El codigo se organiza por rutas, controladores, middlewares, datos y clases. |
| RNF03 | Configuracion | Variables sensibles y de entorno se manejan mediante `.env`. |
| RNF04 | Compatibilidad | La API responde en formato JSON. |
| RNF05 | Validacion | Los datos requeridos se validan antes de crear o actualizar recursos. |
| RNF06 | Trazabilidad | Las pruebas se documentan en `requests/rutas.rest`. |

## 5. Reglas De Negocio

1. Para iniciar sesion se requiere `email` y `password`.
2. Las credenciales invalidas deben responder `401`.
3. Las rutas de pacientes, medicos y examenes requieren JWT.
4. Los pacientes requieren `nombre`, `rut`, `edad` y `diagnostico`.
5. La edad del paciente debe ser un numero entero mayor o igual a 0.
6. No se permite crear pacientes con `rut` duplicado.
7. Los medicos requieren `nombre`, `especialidad`, `email` y `registroMedico`.
8. No se permite crear medicos con `email` o `registroMedico` duplicado.
9. Solo se aceptan examenes en formato PDF.
10. El campo de subida de archivo debe llamarse `archivo`.
11. Los archivos PDF se guardan en `uploads/examenes`.

## 6. Arquitectura General

```mermaid
flowchart LR
  Cliente["Cliente REST / Frontend"] --> API["API Express"]
  API --> Rutas["Routes"]
  Rutas --> Middlewares["Middlewares"]
  Middlewares --> Controladores["Controllers"]
  Controladores --> DatosMemoria["Arreglos en memoria"]
  Controladores --> Uploads["uploads/examenes"]
  Controladores --> Sequelize["Sequelize"]
  Sequelize --> PostgreSQL["PostgreSQL"]
```

## 7. Estructura Del Proyecto

```text
database/
  init.sql
docs/
  documentacion-tecnica-backend.md
requests/
  rutas.rest
  examen-prueba.pdf
src/
  classes/
    Persona.js
    Paciente.js
    Medico.js
  controllers/
  data/
  middlewares/
  models/
  routes/
  services/
uploads/
  examenes/
index.js
```

## 8. Modelo De Clases Con Herencia

El backend usa herencia para representar personas de la clinica:

- `Persona` es la clase base.
- `Paciente` hereda de `Persona`.
- `Medico` hereda de `Persona`.

```mermaid
classDiagram
  class Persona {
    +number id
    +string nombre
    +string telefono
    +string email
    +actualizar(datos)
  }

  class Paciente {
    +string rut
    +number edad
    +string diagnostico
    +string previsional
  }

  class Medico {
    +string especialidad
    +string registroMedico
  }

  Persona <|-- Paciente
  Persona <|-- Medico
```

## 9. Modelo Relacional PostgreSQL

PostgreSQL se usa para usuarios del sistema y login. El archivo `database/init.sql` crea la base inicial.

```mermaid
erDiagram
  USUARIOS {
    int id PK
    varchar nombre
    varchar email UK
    varchar password
    varchar rol
  }

  PACIENTES_REFERENCIA {
    int id PK
    varchar nombre
    varchar rut UK
    int edad
    varchar diagnostico
    varchar previsional
  }

  MEDICOS_REFERENCIA {
    int id PK
    varchar nombre
    varchar especialidad
    varchar email UK
    varchar registro_medico UK
  }
```

Nota: pacientes y medicos operativos se trabajan en memoria para cumplir el requerimiento de la actividad backend.

## 10. Flujo De Login

```mermaid
flowchart TD
  A["Inicio: POST /api/v1/auth/login"] --> B{"Email y password enviados?"}
  B -- No --> C["Responder 400"]
  B -- Si --> D["Buscar usuario en PostgreSQL"]
  D --> E{"Usuario existe?"}
  E -- No --> F["Responder 401"]
  E -- Si --> G{"Password correcto?"}
  G -- No --> F
  G -- Si --> H["Generar JWT"]
  H --> I["Responder 200 con token"]
```

## 11. Flujo De Autenticacion JWT

```mermaid
flowchart TD
  A["Solicitud a ruta privada"] --> B{"Existe header Authorization?"}
  B -- No --> C["Responder 401 Token no proporcionado"]
  B -- Si --> D{"Formato Bearer token?"}
  D -- No --> E["Responder 401 Formato invalido"]
  D -- Si --> F["Verificar JWT"]
  F --> G{"Token valido?"}
  G -- No --> H["Responder 401 Token invalido o expirado"]
  G -- Si --> I["Guardar payload en req.usuario"]
  I --> J["Continuar al controlador"]
```

## 12. Flujo CRUD Pacientes

```mermaid
flowchart TD
  A["Solicitud /api/v1/pacientes"] --> B["Middleware JWT"]
  B --> C{"Token valido?"}
  C -- No --> D["Responder 401"]
  C -- Si --> E{"Operacion"}
  E --> F["GET lista o detalle"]
  E --> G["POST crear"]
  E --> H["PUT actualizar"]
  E --> I["DELETE eliminar"]
  F --> J{"Paciente existe si aplica?"}
  J -- No --> K["Responder 404"]
  J -- Si --> L["Responder 200"]
  G --> M{"Datos validos y rut no duplicado?"}
  M -- No --> N["Responder 400"]
  M -- Si --> O["Crear instancia Paciente"]
  O --> P["Guardar en arreglo"]
  P --> Q["Responder 201"]
  H --> R{"Existe y datos validos?"}
  R -- No --> S["Responder 400 o 404"]
  R -- Si --> T["Actualizar instancia"]
  T --> U["Responder 200"]
  I --> V{"Existe paciente?"}
  V -- No --> K
  V -- Si --> W["Eliminar del arreglo"]
  W --> X["Responder 200"]
```

## 13. Flujo CRUD Medicos

```mermaid
flowchart TD
  A["Solicitud /api/v1/medicos"] --> B["Middleware JWT"]
  B --> C{"Token valido?"}
  C -- No --> D["Responder 401"]
  C -- Si --> E{"Operacion"}
  E --> F["GET lista o detalle"]
  E --> G["POST crear"]
  E --> H["PUT actualizar"]
  E --> I["DELETE eliminar"]
  F --> J{"Medico existe si aplica?"}
  J -- No --> K["Responder 404"]
  J -- Si --> L["Responder 200"]
  G --> M{"Datos validos y sin duplicados?"}
  M -- No --> N["Responder 400"]
  M -- Si --> O["Crear instancia Medico"]
  O --> P["Guardar en arreglo"]
  P --> Q["Responder 201"]
  H --> R{"Existe y datos validos?"}
  R -- No --> S["Responder 400 o 404"]
  R -- Si --> T["Actualizar instancia"]
  T --> U["Responder 200"]
  I --> V{"Existe medico?"}
  V -- No --> K
  V -- Si --> W["Eliminar del arreglo"]
  W --> X["Responder 200"]
```

## 14. Flujo Subida De Examen PDF

```mermaid
flowchart TD
  A["POST /api/v1/examenes"] --> B["Middleware JWT"]
  B --> C{"Token valido?"}
  C -- No --> D["Responder 401"]
  C -- Si --> E["Multer procesa campo archivo"]
  E --> F{"Archivo enviado?"}
  F -- No --> G["Responder 400"]
  F -- Si --> H{"Mimetype application/pdf y extension .pdf?"}
  H -- No --> I["Responder 400 Solo PDF"]
  H -- Si --> J["Renombrar archivo"]
  J --> K["Guardar en uploads/examenes"]
  K --> L["Responder 201"]
```

## 15. Flujo Listado De Examenes

```mermaid
flowchart TD
  A["GET /api/v1/examenes"] --> B["Middleware JWT"]
  B --> C{"Token valido?"}
  C -- No --> D["Responder 401"]
  C -- Si --> E["Leer carpeta uploads/examenes"]
  E --> F["Filtrar archivos .pdf"]
  F --> G["Responder 200 con nombres de archivos"]
```

## 16. Casos De Uso

```mermaid
flowchart LR
  Admin["Administrador"] --> Login["Iniciar sesion"]
  Admin --> VerAcerca["Consultar informacion publica"]
  Admin --> GestionPacientes["Gestionar pacientes"]
  Admin --> GestionMedicos["Gestionar medicos"]
  Admin --> SubirExamen["Subir examen PDF"]
  Admin --> ListarExamenes["Listar examenes subidos"]
```

## 17. Codigos HTTP

| Codigo | Uso |
| --- | --- |
| 200 | Consulta, actualizacion o eliminacion correcta |
| 201 | Creacion correcta o subida de PDF correcta |
| 400 | Campos faltantes, datos invalidos, duplicados o archivo no permitido |
| 401 | Credenciales invalidas, token ausente, token invalido o token expirado |
| 404 | Ruta inexistente o recurso no encontrado |
| 500 | Error interno del servidor |

## 18. Endpoints

### Publicos

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/` | Estado general de la API |
| GET | `/api/v1/acerca` | Informacion publica de la API |
| POST | `/api/v1/auth/login` | Login y generacion de token |
| GET | `/health` | Verificacion de conexion con base de datos |

### Privados

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/v1/auth/perfil` | Valida token |
| GET | `/api/v1/pacientes` | Lista pacientes |
| GET | `/api/v1/pacientes/:id` | Obtiene paciente |
| POST | `/api/v1/pacientes` | Crea paciente |
| PUT | `/api/v1/pacientes/:id` | Actualiza paciente |
| DELETE | `/api/v1/pacientes/:id` | Elimina paciente |
| GET | `/api/v1/medicos` | Lista medicos |
| GET | `/api/v1/medicos/:id` | Obtiene medico |
| POST | `/api/v1/medicos` | Crea medico |
| PUT | `/api/v1/medicos/:id` | Actualiza medico |
| DELETE | `/api/v1/medicos/:id` | Elimina medico |
| GET | `/api/v1/examenes` | Lista archivos PDF subidos |
| POST | `/api/v1/examenes` | Sube examen PDF |

## 19. Pruebas Funcionales

Las pruebas estan documentadas en:

```text
requests/rutas.rest
```

Casos cubiertos:

- Login correcto.
- Login con campos faltantes.
- Login con credenciales invalidas.
- Acceso privado sin token.
- Acceso privado con token.
- CRUD completo de pacientes.
- CRUD completo de medicos.
- Subida correcta de PDF.
- Rechazo de archivo no PDF.
- Listado de examenes.

## 20. Consideraciones De Seguridad

- JWT se firma con `JWT_SECRET` desde `.env`.
- El token tiene expiracion configurable con `JWT_EXPIRES_IN`.
- Las rutas privadas usan middleware centralizado.
- Los archivos subidos se limitan a PDF.
- El tamano maximo de archivo es 5 MB.

## 21. Limitaciones

- Las contrasenas estan en texto plano por fines didacticos.
- Pacientes y medicos se almacenan en memoria, por lo que se pierden al reiniciar el servidor.
- El frontend se encuentra en otro repositorio.
