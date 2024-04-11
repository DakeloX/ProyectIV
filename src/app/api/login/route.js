import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const user = await sql`
            SELECT * FROM "user" WHERE email = ${email} AND password = ${password}
        `;

        if (user.rows.length === 0) {
            // No se encontró ningún usuario con las credenciales proporcionadas
            return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
        }

        // Las credenciales son correctas, se puede proceder con el inicio de sesión
        return NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
    }
}