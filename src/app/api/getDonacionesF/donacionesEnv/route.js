import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { idFundacion } = await request.json();

        const result = await sql`
            SELECT * FROM donacion 
            WHERE fundacion_id_fundacion = ${idFundacion}
            AND fecha_caducidad > NOW()
            ORDER BY fecha_caducidad ASC;
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener donaciones:', error);
        return NextResponse.json({ error: 'Error al obtener donaciones' }, { status: 500 });
    }
}