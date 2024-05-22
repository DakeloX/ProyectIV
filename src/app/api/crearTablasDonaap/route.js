// pages/api/crear-tablas.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // Crear tabla de roles
        await sql`
            CREATE TABLE roles (
                id_rol SERIAL PRIMARY KEY,
                nombre_rol VARCHAR(20),
                descripcion_rol VARCHAR(200)
            );
        `;

        // Insertar un rol de donador
        await sql`
            INSERT INTO roles (nombre_rol, descripcion_rol)
            VALUES ('Donador', 'Rol para usuarios que desean realizar donaciones');
        `;

        // Crear tabla de "user" (con comillas invertidas)
        await sql`
            CREATE TABLE "user" (
                id_user VARCHAR(16) PRIMARY KEY,
                username VARCHAR(24) NOT NULL,
                email VARCHAR(100),
                password VARCHAR(100) NOT NULL,
                telefono VARCHAR(20),
                departamento TEXT,
                ciudad TEXT,
                roles_id_rol INT NOT NULL,
                FOREIGN KEY (roles_id_rol) REFERENCES roles(id_rol)
            );
        `;

        // Crear tabla de fundaciones
        await sql`
            CREATE TABLE fundacion (
                id_fundacion VARCHAR(20) PRIMARY KEY NOT NULL,
                nombre VARCHAR(50)  NOT NULL,
                password VARCHAR(100)  NOT NULL,
                email VARCHAR(100),
                telefono VARCHAR(20),
                departamento TEXT,
                ciudad TEXT,
                direccion VARCHAR(100),
                website VARCHAR(100)
            );
        `;

        // Crear tabla de donaciones
        await sql`
            CREATE TABLE donacion (
                id_donacion VARCHAR(8) PRIMARY KEY,
                nombre_producto VARCHAR(100) NOT NULL,
                cantidad INT NOT NULL,
                descripcion TEXT,
                fecha_caducidad DATE,
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fundacion_id_fundacion VARCHAR(100) NOT NULL,
                user_id_user VARCHAR(45) NOT NULL,
                additional_comments TEXT,
                FOREIGN KEY (fundacion_id_fundacion) REFERENCES fundacion(id_fundacion),
                FOREIGN KEY (user_id_user) REFERENCES "user"(id_user)
            );
        `;

        // Crear tabla de estados
        await sql`
            CREATE TABLE estado (
                id_estado SERIAL PRIMARY KEY,
                nombre VARCHAR(45),
                descripcion VARCHAR(100)
            );
        `;

        // Crear tabla de estados
        await sql`
            CREATE TABLE conductores (
                identificacion VARCHAR(20) PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                correo VARCHAR(255) NOT NULL,
                contraseña VARCHAR(255) NOT NULL
            );
        `;

        // Crear tabla de vehículos
        await sql`
            CREATE TABLE vehiculo (
                id_vehiculo SERIAL PRIMARY KEY,
                numero_placa VARCHAR(10) NOT NULL UNIQUE,
                tipo_vehiculo VARCHAR(45),
                capacidad INT NOT NULL,
                propietario VARCHAR(50) NOT NULL,
                FOREIGN KEY (propietario) REFERENCES propietario_vehiculo (id_propietario)
            );
        `;

        await sql`
            CREATE TABLE propietario_vehiculo (
                id_propietario VARCHAR(50) PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
            );
        `;


        await sql `
            CREATE TABLE cargamento (
                id_cargamento SERIAL PRIMARY KEY,
                peso INT NOT NULL
            );
        `;

        await sql `
        CREATE TABLE cargamento_donacion (
            id SERIAL PRIMARY KEY,
            cargamento_id INT,
            donacion_id VARCHAR(8),
            FOREIGN KEY (cargamento_id) REFERENCES cargamento(id_cargamento),
            FOREIGN KEY (donacion_id) REFERENCES donacion(id_donacion),
            UNIQUE (cargamento_id, donacion_id)
        );
    `;


        // Crear tabla de rastreos
        await sql`
            CREATE TABLE ruta (
                id_ruta SERIAL PRIMARY KEY,
                vehiculo VARCHAR(10) NOT NULL,
                conductor VARCHAR(20) NOT NULL,
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
