import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    
    const id = '1111111111'
    try {
        const result = await sql`
            SELECT * FROM donacion WHERE fundacion_id_fundacion = ${id}
        `;
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener donaciones:', error);
        return NextResponse.json({ error: 'Error al obtener donaciones' }, { status: 500 });
    }
}