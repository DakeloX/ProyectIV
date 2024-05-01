import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { userId, productName, description, quantity, expiryDate, additionalComments } = await request.json();

    try {
        const result = await sql`
            INSERT INTO donacion (nombre_producto, cantidad, descripcion, fecha_caducidad, additional_comments, fundacion_id_fundacion, user_id_user)
            VALUES (${productName}, ${quantity}, ${description}, ${expiryDate}, ${additionalComments}, '1111111111', ${userId})
        `;
        return NextResponse.json({ message: 'Donación registrada exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al registrar donación:', error);
        return NextResponse.json({ error: 'Error al registrar donación' }, { status: 500 });
    }
}
