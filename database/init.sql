-- Active: 1775610264034@@127.0.0.1@5432@clinica_api
-- Base inicial para la API de clinica.
-- Ejecutar este archivo en PostgreSQL antes de probar el login.

CREATE DATABASE clinica_api;

-- Luego conectarse a la base:
-- \c clinica_api

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL DEFAULT 'admin'
);

INSERT INTO usuarios (nombre, email, password, rol)
VALUES ('Administrador Clinica', 'admin@clinica.dev', '123456', 'admin')
ON CONFLICT (email) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  password = EXCLUDED.password,
  rol = EXCLUDED.rol;

-- Tablas opcionales de referencia para documentar el dominio de la clinica.
-- En la evaluacion, pacientes y medicos se trabajaran sobre arreglos en memoria.

CREATE TABLE IF NOT EXISTS pacientes_referencia (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  rut VARCHAR(20) NOT NULL UNIQUE,
  edad INTEGER NOT NULL CHECK (edad >= 0),
  diagnostico VARCHAR(255),
  previsional VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS medicos_referencia (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  especialidad VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  registro_medico VARCHAR(50) NOT NULL UNIQUE
);
