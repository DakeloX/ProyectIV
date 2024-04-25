import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { id_fundacion, nombre, email, password, telefono, departamento, ciudad, direccion, website } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await sql`
            INSERT INTO fundacion (id_fundacion, nombre, email, password, telefono, departamento, ciudad, direccion, website)
            VALUES (${id_fundacion}, ${nombre}, ${email}, ${hashedPassword}, ${telefono}, ${departamento}, ${ciudad}, ${direccion}, ${website})
        `;
        return NextResponse.json({ message: 'Fundación registrada exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al registrar fundación:', error);
        return NextResponse.json({ error: 'Error al registrar fundación' }, { status: 500 });
    }
}