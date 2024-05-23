import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { nombre, identificacion, correo, contraseña, idFundacion } = await request.json();
    
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    try {
        const result = await sql`
        INSERT INTO conductores (identificacion, nombre, correo, password, fundacion)
            VALUES (${identificacion}, ${nombre}, ${correo}, ${hashedPassword}, ${idFundacion})
        `;
        return NextResponse.json({ message: 'Conductor registrado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al registrar conductor:', error);
        return NextResponse.json({ error: 'Error al registrar conductor' }, { status: 500 });
    }
}