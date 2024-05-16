import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { idUser } = await request.json();

        const query = `
            SELECT * FROM donacion WHERE user_id_user = $1
        `;
        const result = await sql.query(query, [idUser]);

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener donaciones:', error);
        return NextResponse.json({ error: 'Error al obtener donaciones' }, { status: 500 });
    }
}
