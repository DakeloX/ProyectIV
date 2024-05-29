import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { idCargamento } = await request.json();
        
        if (!idCargamento) {
            return NextResponse.json({ error: 'idCargamento es requerido' }, { status: 400 });
        }

        // Obtener el ID del estado "En Camino"
        const estadoEnCamino = 3;

        // Actualizar el estado de las donaciones asociadas al cargamento
        await sql`
            UPDATE donacion
            SET estado = ${estadoEnCamino}
            WHERE id_donacion IN (
                SELECT donacion_id
                FROM cargamento_donacion
                WHERE cargamento_id = ${idCargamento}
            );
        `;

        // Actualizar el estado del cargamento a "En Camino"
        await sql`
            UPDATE cargamento
            SET estado = ${estadoEnCamino}
            WHERE id_cargamento = ${idCargamento};
        `;

        // Actualizar el estado en la tabla cargamento_donacion
        await sql`
            UPDATE cargamento_donacion
            SET estado_id = ${estadoEnCamino}
            WHERE cargamento_id = ${idCargamento};
        `;

        return NextResponse.json({ message: 'Cargamento actualizado a "En Camino" con éxito' }, { status: 200 });
    } catch (error) {
        console.error('Error al actualizar el cargamento a "En Camino":', error);
        return NextResponse.json({ error: 'Error al actualizar el cargamento a "En Camino"' }, { status: 500 });
    }
}