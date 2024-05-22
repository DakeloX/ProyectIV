import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { numero_identificacion, nombre } = await request.json();

        if (!numero_identificacion || !nombre) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        const result = await sql`
            INSERT INTO propietario_vehiculo (id_propietario, nombre)
            VALUES (${numero_identificacion}, ${nombre})
        `;

        return NextResponse.json({ message: 'Propietario registrado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al registrar propietario:', error);
        return NextResponse.json({ error: 'Error al registrar propietario' }, { status: 500 });
    }
}