import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const id = '1111111111';
        const query = `
            SELECT * FROM donacion WHERE fundacion_id_fundacion = $1
        `;
        const result = await sql.query(query, [id]);

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener donaciones:', error);
        return NextResponse.json({ error: 'Error al obtener donaciones' }, { status: 500 });
    }
}