import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { numero_placa, tipo_vehiculo, capacidad, propietario } = await request.json();

        if (!numero_placa || !tipo_vehiculo || !capacidad || !propietario) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        const result = await sql`
            INSERT INTO vehiculo (numero_placa, tipo_vehiculo, capacidad, propietario)
            VALUES (${numero_placa}, ${tipo_vehiculo}, ${capacidad}, ${propietario})
        `;

        return NextResponse.json({ message: 'Vehículo registrado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al registrar vehículo:', error);
        return NextResponse.json({ error: 'Error al registrar vehículo' }, { status: 500 });
    }
}
