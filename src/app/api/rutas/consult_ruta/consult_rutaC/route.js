import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function POST(request) {
    noStore();

    const { idConductor } = await request.json();

    try {
        const result = await sql`
            SELECT * FROM rutas WHERE id_conductor = ${idConductor};
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener conductores:', error);
        return NextResponse.json({ error: 'Error al obtener conductores' }, { status: 500 });
    }
}
