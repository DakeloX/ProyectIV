// Importar módulos necesarios
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'; 
import { NextResponse } from 'next/server';


// Definir la función de la ruta para cambiar la contraseña
export async function POST(request, response) {
    const { email, newPassword } = await request.json(); 
    const token = request.headers.authorization; 

    console.log('Token recibido en la solicitud:', token); 

    try {
        await checkAuth(request, response, token); // Pasamos el token como tercer argumento

        // Consultar el usuario por su correo electrónico
        const userResult = await sql`SELECT * FROM "user" WHERE email = ${email}`;

        // Verificar si se encontró el usuario
        if (userResult.rows.length === 0) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // Obtener el usuario de la consulta
        const user = userResult.rows[0];

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario en la base de datos
        await sql`UPDATE "user" SET password = ${hashedPassword} WHERE id = ${user.id}`;

        // Respuesta exitosa
        return NextResponse.json({ message: 'Contraseña cambiada exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);

        // Manejar errores
        if (error.message === 'Token no proporcionado' || error.message === 'Token no válido') {
            return NextResponse.json({ error: 'Token no válido' }, { status: 401 });
        } else {
            return NextResponse.json({ error: 'Error al cambiar contraseña' }, { status: 500 });
        }
    }
}
