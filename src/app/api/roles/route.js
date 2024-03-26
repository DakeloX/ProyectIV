// ./src/app/api/roles/route.js
import { NextResponse } from "next/server";
import { conn } from '../../libs/mysql';

export async function GET() {
    try {
        // Consulta para obtener los roles de la base de datos
        const [rows] = await conn.promise().query('SELECT id_rol, nombre_rol FROM roles');
        
        // Mapear los resultados para obtener el id y el nombre de cada rol
        const roles = rows.map(({ id_rol, nombre_rol }) => ({ id: id_rol, nombre: nombre_rol }));

        // Imprimir los roles en la consola
        console.log('Roles obtenidos de la base de datos:');
        roles.forEach(role => {
            console.log(`ID: ${role.id}, Nombre: ${role.nombre}`);
        });

        // Enviar los roles como respuesta al cliente
        return NextResponse.json(roles);
    } catch (error) {
        // Manejar errores si ocurren durante la consulta
        console.error('Error al obtener roles:', error);
        return NextResponse.json({ error: "Error al obtener roles" }, { status: 500 });
    }
}
