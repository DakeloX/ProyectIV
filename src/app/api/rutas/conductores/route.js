import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await sql`
            SELECT * FROM conductores;
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener conductores:', error);
        return NextResponse.json({ error: 'Error al obtener conductores' }, { status: 500 });
    }
}