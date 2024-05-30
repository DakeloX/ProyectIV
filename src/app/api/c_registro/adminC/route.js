import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const idFundacion = searchParams.get('idFundacion');

        if (!idFundacion) {
            return NextResponse.json({ error: 'idFundacion is required' }, { status: 400 });
        }

        const result = await sql`
            SELECT * FROM conductores
            WHERE fundacion = ${idFundacion};
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener conductores:', error);
        return NextResponse.json({ error: 'Error al obtener conductores' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { identificacion } = await request.json();

        if (!identificacion) {
            return NextResponse.json({ error: 'ID del vehículo es obligatorio' }, { status: 400 });
        }

        const result = await sql`
            DELETE FROM conductores WHERE identificacion = ${identificacion}
        `;

        return NextResponse.json({ message: 'Vehículo eliminado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al eliminar vehículo:', error);
        return NextResponse.json({ error: 'Error al eliminar vehículo' }, { status: 500 });
    }
}
