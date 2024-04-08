// pages/api/crear-tablas.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // Crear tabla de roles
        await sql`
            CREATE TABLE IF NOT EXISTS roles (
                id_rol SERIAL PRIMARY KEY,
                nombre_rol VARCHAR(20),
                descripcion_rol VARCHAR(100)
            );
        `;

        // Crear tabla de "user" (con comillas invertidas)
        await sql`
            CREATE TABLE IF NOT EXISTS "user" (
                id_user VARCHAR(45) PRIMARY KEY,
                username VARCHAR(16) NOT NULL,
                email VARCHAR(255),
                password VARCHAR(32) NOT NULL,
                telefono INT,
                fechaNacimiento DATE,
                roles_id_rol INT NOT NULL,
                FOREIGN KEY (roles_id_rol) REFERENCES roles(id_rol)
            );
        `;

        // Crear tabla de fundaciones
        await sql`
            CREATE TABLE IF NOT EXISTS fundacion (
                id_fundacion VARCHAR(100) PRIMARY KEY,
                nombre VARCHAR(100),
                direccion VARCHAR(100),
                email VARCHAR(45),
                telefono INT
            );
        `;

        // Crear tabla de donaciones
        await sql`
            CREATE TABLE IF NOT EXISTS donacion (
                id_producto VARCHAR(50) PRIMARY KEY,
                cantidad VARCHAR(45),
                descripcion VARCHAR(100),
                punto_salida VARCHAR(45),
                punto_llegada VARCHAR(45),
                fundacion_id_fundacion VARCHAR(100) NOT NULL,
                user_id_user VARCHAR(45) NOT NULL,
                FOREIGN KEY (fundacion_id_fundacion) REFERENCES fundacion(id_fundacion),
                FOREIGN KEY (user_id_user) REFERENCES "user"(id_user)
            );
        `;

        // Crear tabla de estados
        await sql`
            CREATE TABLE IF NOT EXISTS estado (
                id_estado SERIAL PRIMARY KEY,
                nombre VARCHAR(45),
                descripcion VARCHAR(100)
            );
        `;

        // Crear tabla de vehículos
        await sql`
            CREATE TABLE IF NOT EXISTS vehiculo (
                id_vehiculo SERIAL PRIMARY KEY,
                numero_placa VARCHAR(10),
                tipo_vehiculo VARCHAR(45),
                propietario VARCHAR(45)
            );
        `;

        // Crear tabla de rastreos
        await sql`
            CREATE TABLE IF NOT EXISTS rastreo (
                id_rastreo SERIAL PRIMARY KEY,
                ubicacion_geografica VARCHAR(45),
                donacion_id_producto VARCHAR(50) NOT NULL,
                estado_id_estado INT NOT NULL,
                vehiculo_id_vehiculo INT NOT NULL,
                FOREIGN KEY (donacion_id_producto) REFERENCES donacion(id_producto),
                FOREIGN KEY (estado_id_estado) REFERENCES estado(id_estado),
                FOREIGN KEY (vehiculo_id_vehiculo) REFERENCES vehiculo(id_vehiculo)
            );
        `;

        return NextResponse.json({ message: "Tablas creadas exitosamente" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message || 'Ocurrió un error al crear las tablas' }, { status: 500 });
    }
}
