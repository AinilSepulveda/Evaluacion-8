# API Clinica Modulo 8

API REST construida con Node.js y Express para la evaluacion final del Modulo 8. Permite autenticacion con JWT, endpoints publicos, CRUD privado de pacientes y medicos en memoria, subida de examenes PDF y listado de archivos subidos al servidor.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- Sequelize
- JSON Web Token
- Multer
- REST Client para pruebas con archivo `.rest`

## Instalacion

```bash
npm install
```

## Configuracion `.env`

Crear o revisar el archivo `.env` en la raiz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=clinica_api

JWT_SECRET=clave_secreta_jwt
JWT_EXPIRES_IN=1h

PORT=3000
```

## Base de datos

El proyecto usa PostgreSQL para el login de usuarios.

El archivo SQL esta en:

```text
database/init.sql
```

Ese script crea:

- Base de datos `clinica_api`
- Tabla `usuarios`
- Usuario administrador de prueba
- Tablas de referencia para pacientes y medicos

Credenciales de prueba:

```json
{
  "email": "admin@clinica.dev",
  "password": "123456"
}
```

Importante: el CRUD de pacientes y medicos se trabaja sobre arreglos en memoria, segun el requerimiento de la evaluacion.

## Ejecutar servidor

```bash
npm run dev
```

Servidor por defecto:

```text
http://localhost:3000
```

## Pruebas con REST Client

El archivo de pruebas esta en:

```text
requests/rutas.rest
```

Orden recomendado:

1. Ejecutar `GET /api/v1/acerca`.
2. Ejecutar `Login correcto`.
3. Ejecutar las rutas privadas usando:

```http
Authorization: Bearer {{loginClinica.response.body.token}}
```

Para probar subida de PDF se incluye:

```text
requests/examen-prueba.pdf
```

## Endpoints publicos

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/` | Estado basico de la API |
| GET | `/api/v1/acerca` | Informacion publica sobre la API |
| POST | `/api/v1/auth/login` | Login y generacion de JWT |
| GET | `/health` | Verifica conexion con base de datos |

## Endpoints privados

Todos los endpoints privados requieren:

```http
Authorization: Bearer token
```

### Perfil

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/v1/auth/perfil` | Valida token y retorna payload |

### Pacientes

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/v1/pacientes` | Lista pacientes |
| GET | `/api/v1/pacientes/:id` | Obtiene un paciente por id |
| POST | `/api/v1/pacientes` | Crea un paciente |
| PUT | `/api/v1/pacientes/:id` | Actualiza un paciente |
| DELETE | `/api/v1/pacientes/:id` | Elimina un paciente |

Campos principales para crear paciente:

```json
{
  "nombre": "Valentina Perez",
  "rut": "20.111.222-3",
  "edad": 29,
  "telefono": "+56911112222",
  "email": "valentina.perez@example.com",
  "diagnostico": "Examen preventivo",
  "previsional": "Fonasa"
}
```

Campos obligatorios:

- `nombre`
- `rut`
- `edad`
- `diagnostico`

### Medicos

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/v1/medicos` | Lista medicos |
| GET | `/api/v1/medicos/:id` | Obtiene un medico por id |
| POST | `/api/v1/medicos` | Crea un medico |
| PUT | `/api/v1/medicos/:id` | Actualiza un medico |
| DELETE | `/api/v1/medicos/:id` | Elimina un medico |

Campos principales para crear medico:

```json
{
  "nombre": "Dra. Natalia Vega",
  "especialidad": "Pediatria",
  "email": "natalia.vega@clinica.dev",
  "telefono": "+56977778888",
  "registroMedico": "RM-1003"
}
```

Campos obligatorios:

- `nombre`
- `especialidad`
- `email`
- `registroMedico`

### Examenes PDF

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/v1/examenes` | Lista nombres de archivos PDF subidos |
| POST | `/api/v1/examenes` | Sube un examen PDF |

La subida usa `multipart/form-data`.

Nombre del campo de archivo:

```text
archivo
```

Los archivos se guardan en:

```text
uploads/examenes
```

Solo se aceptan archivos con:

- Extension `.pdf`
- Tipo MIME `application/pdf`

## Codigos HTTP usados

| Codigo | Uso |
| --- | --- |
| 200 | Consultas correctas, actualizaciones correctas y eliminaciones correctas |
| 201 | Creacion correcta de pacientes/medicos o subida correcta de PDF |
| 400 | Datos invalidos, campos faltantes, duplicados o archivo no permitido |
| 401 | Token ausente, token invalido, token expirado o credenciales invalidas |
| 404 | Ruta inexistente o recurso no encontrado |
| 500 | Error interno del servidor |

Todas las respuestas principales incluyen un campo `codigo` en el cuerpo JSON.

Ejemplo correcto:

```json
{
  "codigo": 200,
  "message": "Pacientes obtenidos correctamente",
  "total": 2,
  "data": []
}
```

Ejemplo de error:

```json
{
  "codigo": 401,
  "message": "Token no proporcionado"
}
```

## Estructura principal

```text
database/
  init.sql
requests/
  rutas.rest
  examen-prueba.pdf
src/
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

## Notas

- El login usa usuario guardado en PostgreSQL.
- Las contrasenas estan en texto plano solo para fines didacticos.
- Pacientes y medicos se guardan en memoria, por lo que se reinician al detener el servidor.
- Los examenes PDF quedan guardados fisicamente en `uploads/examenes`.
