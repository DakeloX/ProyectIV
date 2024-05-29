import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { id_ruta, donaciones } = await request.json();

        for (const id_donacion of donaciones) {
            await sql`
                INSERT INTO carga_ruta (id_ruta, id_donacion)
                VALUES (${id_ruta}, ${id_donacion});
            `;
        }

        return NextResponse.json({ message: 'Cargas asignadas exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al asignar las cargas a la ruta:', error);
        return NextResponse.json({ error: 'Error al asignar las cargas a la ruta' }, { status: 500 });
    }
}