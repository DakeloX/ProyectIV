import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { cargamento, donacion } = await request.json();

        // Insertar la donación con el cargamento y la ruta
        await sql`
            INSERT INTO cargamento_donacion (cargamento_id, donacion_id, estado_id)
            VALUES (${cargamento}, ${donacion}, 2);
        `;
        await sql`
            UPDATE donacion
            SET estado = 2
            WHERE id_donacion = ${donacion};
        `;

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error al obtener donaciones:', error);
        return NextResponse.json({ error: 'Error al obtener donaciones' }, { status: 500 });
    }
}