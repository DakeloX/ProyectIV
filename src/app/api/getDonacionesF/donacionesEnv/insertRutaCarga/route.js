import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { cargamento, ruta, fundacion, peso } = await request.json();

        // Insertar la ruta y el cargamento solo si no se han registrado previamente
            await sql`
                INSERT INTO ruta_cargamento (cargamento, ruta, fundacion)
                VALUES (${cargamento}, ${ruta}, ${fundacion});
            `;


        // Actualizar el estado del cargamento
        await sql`
            UPDATE cargamento
            SET estado = 2
            WHERE id_cargamento = ${cargamento};
        `;

        // Actualizar el peso del cargamento
        await sql`
            UPDATE cargamento
            SET peso = ${peso}
            WHERE id_cargamento = ${cargamento};
        `;

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error al asignar Ruta:', error);
        return NextResponse.json({ error: 'Error al asignar ruta' }, { status: 500 });
    }
}