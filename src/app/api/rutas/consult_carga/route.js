import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
export async function GET() {
    noStore();
    try {
        const result = await sql`
            SELECT * FROM cargamento WHERE estado = 1;
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        return NextResponse.json({ error: 'Error al obtener los vehículos' }, { status: 500 });
    }
}
