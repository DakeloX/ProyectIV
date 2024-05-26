import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { id_vehiculo, id_conductor, fecha_salida, ciudad_destino, direccion, idFundacion } = await request.json();

        const result = await sql`
            INSERT INTO rutas (id_vehiculo, id_conductor, fecha_salida, ciudad_destino, direccion, id_fundacion)
            VALUES (${id_vehiculo}, ${id_conductor}, ${fecha_salida}, ${ciudad_destino}, ${direccion}, ${idFundacion})
            RETURNING id_ruta;
        `;

        return NextResponse.json({ id_ruta: result.rows[0].id_ruta }, { status: 200 });
    } catch (error) {
        console.error('Error al registrar la ruta:', error);
        return NextResponse.json({ error: 'Error al registrar la ruta' }, { status: 500 });
    }
}