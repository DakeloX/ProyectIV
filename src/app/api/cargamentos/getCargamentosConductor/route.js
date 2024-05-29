import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function POST(request) {
    noStore();
    try {
        const { idConductor } = await request.json();

        const result = await sql`
            SELECT 
                cargamento.id_cargamento,
                cargamento.peso,
                estadocargamento.nombre AS estado,
                ruta_cargamento.ruta AS ruta,
                COALESCE(
                    STRING_AGG(donacion.nombre_producto, ', '),
                    'No hay donaciones'
                ) AS donaciones
            FROM 
                cargamento
            JOIN 
                ruta_cargamento ON cargamento.id_cargamento = ruta_cargamento.cargamento
            JOIN 
                rutas ON ruta_cargamento.ruta = rutas.id_ruta
            JOIN 
                conductores ON rutas.id_conductor = conductores.identificacion
            JOIN 
                estadocargamento ON cargamento.estado = estadocargamento.idestadocargamento
            LEFT JOIN 
                cargamento_donacion ON cargamento.id_cargamento = cargamento_donacion.cargamento_id
            LEFT JOIN 
                donacion ON cargamento_donacion.donacion_id = donacion.id_donacion
            WHERE 
                conductores.identificacion = ${idConductor}
            GROUP BY 
                cargamento.id_cargamento, cargamento.peso, estadocargamento.nombre, ruta_cargamento.ruta;
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener los cargamentos:', error);
        return NextResponse.json({ error: 'Error al obtener los cargamentos' }, { status: 500 });
    }
}