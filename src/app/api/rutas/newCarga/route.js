import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const {fundacion} = await request.json();

        const result = await sql`
            INSERT INTO cargamento (peso, fundacion, estado)
            VALUES (0, ${fundacion}, 1);
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        return NextResponse.json({ error: 'Error al obtener los vehículos' }, { status: 500 });
    }
}