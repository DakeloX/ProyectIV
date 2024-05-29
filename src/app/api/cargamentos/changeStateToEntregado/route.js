import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { idCargamento } = await request.json();
        
        if (!idCargamento) {
            return NextResponse.json({ error: 'idCargamento es requerido' }, { status: 400 });
        }

        // Obtener el ID del estado "Entregado"
        const estadoEntregado = 4;

        // Actualizar el estado de las donaciones asociadas al cargamento
        await sql`
            UPDATE donacion
            SET estado = ${estadoEntregado}
            WHERE id_donacion IN (
                SELECT donacion_id
                FROM cargamento_donacion
                WHERE cargamento_id = ${idCargamento}
            );
        `;

        // Actualizar el estado del cargamento a "Entregado"
        await sql`
            UPDATE cargamento
            SET estado = ${estadoEntregado}
            WHERE id_cargamento = ${idCargamento};
        `;

        // Actualizar el estado en la tabla cargamento_donacion
        await sql`
            UPDATE cargamento_donacion
            SET estado_id = ${estadoEntregado}
            WHERE cargamento_id = ${idCargamento};
        `;

        return NextResponse.json({ message: 'Cargamento actualizado a "Entregado" con éxito' }, { status: 200 });
    } catch (error) {
        console.error('Error al actualizar el cargamento a "Entregado":', error);
        return NextResponse.json({ error: 'Error al actualizar el cargamento a "Entregado"' }, { status: 500 });
    }
}
