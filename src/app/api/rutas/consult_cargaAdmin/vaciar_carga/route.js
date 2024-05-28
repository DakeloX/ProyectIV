import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { idCargamento } = await request.json();
        
        if (!idCargamento) {
            return NextResponse.json({ error: 'idCargamento es requerido' }, { status: 400 });
        }

        // Actualizar el estado de las donaciones asociadas al cargamento
        await sql`
            UPDATE donacion
            SET estado = 1
            WHERE id_donacion IN (
                SELECT donacion_id
                FROM cargamento_donacion
                WHERE cargamento_id = ${idCargamento}
            );
        `;

        // Eliminar las relaciones en la tabla cargamento_donacion
        await sql`
            DELETE FROM cargamento_donacion
            WHERE cargamento_id = ${idCargamento};
        `;

        // Actualizar el estado del cargamento a "1"
        await sql`
            UPDATE cargamento
            SET estado = 1, peso = 0
            WHERE id_cargamento = ${idCargamento};
        `;
        await sql`
        DELETE FROM ruta_cargamento WHERE cargamento = ${idCargamento};
        `

        return NextResponse.json({ message: 'Cargamento vaciado con éxito' }, { status: 200 });
    } catch (error) {
        console.error('Error al vaciar el cargamento:', error);
        return NextResponse.json({ error: 'Error al vaciar el cargamento' }, { status: 500 });
    }
}
