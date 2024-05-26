import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id_ruta } = params;

    try {
        const result = await sql`
            SELECT id_vehiculo, id_conductor, fecha_salida, ciudad_destino, direccion
            FROM ruta 
            WHERE id_ruta = ${id_ruta};
        `;

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Ruta no encontrada' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (error) {
        console.error('Error al obtener detalles de la ruta:', error);
        return NextResponse.json({ error: 'Error al obtener detalles de la ruta' }, { status: 500 });
    }
}