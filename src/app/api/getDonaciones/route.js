import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const id = '1111111111';
        const query = `
            SELECT * FROM donacion WHERE fundacion_id_fundacion = $1
        `;
        const result = await sql.query(query, [id]);

        // Deshabilitar el cache para asegurar la actualización en tiempo real
        const response = NextResponse.json(result.rows, { status: 200 });
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        return response;
    } catch (error) {
        console.error('Error al obtener donaciones:', error);
        return NextResponse.json({ error: 'Error al obtener donaciones' }, { status: 500 });
    }
}