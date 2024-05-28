import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { idCargamento } = await request.json();
        
        if (!idCargamento) {
            return NextResponse.json({ error: 'idCargamento es requerido' }, { status: 400 });
        }
        
        await sql`
        UPDATE donacion
        SET estado = 1
        WHERE id_donacion IN (
            SELECT donacion_id
            FROM cargamento_donacion
            WHERE cargamento_id = ${idCargamento}
        );
        `;

        await sql`
        DELETE FROM ruta_cargamento WHERE cargamento = ${idCargamento};
        `;

        await sql`
            DELETE FROM cargamento_donacion WHERE cargamento_id =  ${idCargamento};
        `;
        await sql`
            DELETE FROM cargamento WHERE id_cargamento = ${idCargamento};
        `;


        return NextResponse.json({ message: 'Cargamento eliminado con éxito' }, { status: 200 });
    } catch (error) {
        console.error('Error al eliminar el cargamento:', error);
        return NextResponse.json({ error: 'Error al eliminar el cargamento' }, { status: 500 });
    }
}
