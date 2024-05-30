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

        const result = await sql`
        SELECT 
            cargamento.id_cargamento,
            cargamento.peso,
            estadocargamento.nombre AS estado,
            COALESCE(
                STRING_AGG(donacion.nombre_producto, ', '),
                'No hay donaciones'
            ) AS donaciones
        FROM 
            cargamento
        JOIN 
            estadocargamento ON cargamento.estado = estadocargamento.idestadocargamento
        LEFT JOIN 
            cargamento_donacion ON cargamento.id_cargamento = cargamento_donacion.cargamento_id
        LEFT JOIN 
            donacion ON cargamento_donacion.donacion_id = donacion.id_donacion
        WHERE
            cargamento.fundacion = ${idFundacion}
        GROUP BY 
            cargamento.id_cargamento, cargamento.peso, estadocargamento.nombre;
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener los cargamentos:', error);
        return NextResponse.json({ error: 'Error al obtener los cargamentos' }, { status: 500 });
    }
}
