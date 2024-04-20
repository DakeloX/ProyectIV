import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const result = await sql`
            SELECT * FROM "fundacion" WHERE email = ${email}
        `;

        if (result.rows.length === 0) {
            // No se encontró ningún usuario con el correo electrónico proporcionado
            return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
        }

        const user = result.rows[0];
        
        // Comparar la contraseña hasheada almacenada con la contraseña proporcionada
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // La contraseña proporcionada no coincide con la contraseña almacenada
            return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
        }

        // Las credenciales son correctas, se puede proceder con el inicio de sesión
        return NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
    }
}
