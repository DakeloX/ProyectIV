import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { id_donacion, estado } = await request.json();

        const result = await sql`
            UPDATE donacion
            SET estado = ${estado}
            WHERE id_donacion = ${id_donacion}
        `;

        return NextResponse.json({ message: 'Estado de la donación actualizado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al actualizar el estado de la donación:', error);
        return NextResponse.json({ error: 'Error al actualizar el estado de la donación' }, { status: 500 });
    }
}