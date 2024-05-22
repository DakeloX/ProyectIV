import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
    noStore();
    try {
        const query = `
            SELECT * FROM propietario_vehiculo
        `;
        const result = await sql.query(query);

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener las fundaciones:', error);
        return NextResponse.json({ error: 'Error al obtener las fundaciones' }, { status: 500 });
    }
}
