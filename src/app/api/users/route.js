import { NextResponse } from "next/server";
import { conn } from '../../libs/mysql';

export async function POST(request) {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { id_user, username, telefono, email, password } = await request.json();
        const roles_id_rol = 1; // Establecer el valor de roles_id_rol como 1

        // Realizar la inserción en la base de datos
        await conn.promise().query('INSERT INTO user (id_user, username, telefono, email, password, roles_id_rol) VALUES (?, ?, ?, ?, ?, ?)', [id_user, username, telefono, email, password, roles_id_rol]);

        // Enviar una respuesta exitosa al cliente
        return NextResponse.json({ success: true, message: "Usuario registrado correctamente" });
    } catch (error) {
        // Manejar errores si ocurren durante la inserción
        console.error('Error al registrar usuario:', error);
        return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 });
    }
}