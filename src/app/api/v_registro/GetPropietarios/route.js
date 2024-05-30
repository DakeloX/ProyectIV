import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request) {
    noStore();
    try {
        const { searchParams } = new URL(request.url);
        const idFundacion = searchParams.get('idFundacion');

        if (!idFundacion) {
            return NextResponse.json({ error: 'idFundacion is required' }, { status: 400 });
        }

        const query = `
            SELECT * FROM propietario_vehiculo
            WHERE fundacion = $1
        `;
        const result = await sql.query(query, [idFundacion]);

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener los propietarios:', error);
        return NextResponse.json({ error: 'Error al obtener los propietarios' }, { status: 500 });
    }
}
