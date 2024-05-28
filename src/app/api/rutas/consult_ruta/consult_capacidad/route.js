import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function POST(request) {
    noStore();

    const { id_ruta } = await request.json();

    if (!id_ruta) {
        return NextResponse.json({ error: 'id_ruta es requerido' }, { status: 400 });
    }

    try {
        const result = await sql`
            SELECT v.capacidad 
            FROM rutas r
            JOIN vehiculo v ON r.id_vehiculo = v.id_vehiculo
            WHERE r.id_ruta = ${id_ruta};
        `;

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Ruta no encontrada' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (error) {
        console.error('Error al obtener capacidad del vehículo:', error);
        return NextResponse.json({ error: 'Error al obtener capacidad del vehículo' }, { status: 500 });
    }
}
