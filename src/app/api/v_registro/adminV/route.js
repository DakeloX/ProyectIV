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
            SELECT * FROM vehiculo
            WHERE fundacion = ${idFundacion};
        `;

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
        return NextResponse.json({ error: 'Error al obtener vehículos' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { id_vehiculo } = await request.json();

        if (!id_vehiculo) {
            return NextResponse.json({ error: 'ID del vehículo es obligatorio' }, { status: 400 });
        }

        const result = await sql`
            DELETE FROM vehiculo WHERE id_vehiculo = ${id_vehiculo}
        `;

        return NextResponse.json({ message: 'Vehículo eliminado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al eliminar vehículo:', error);
        return NextResponse.json({ error: 'Error al eliminar vehículo' }, { status: 500 });
    }
}
