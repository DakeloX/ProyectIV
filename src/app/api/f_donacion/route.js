import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

function generarID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export async function POST(request) {
    const { userId, productName, description, quantity, expiryDate, additionalComments } = await request.json();
    const id_donacion = generarID(8); // Generar ID de longitud 8
    try {
        const result = await sql`
            INSERT INTO donacion (id_donacion, nombre_producto, cantidad, descripcion, fecha_caducidad, additional_comments, fundacion_id_fundacion, user_id_user)
            VALUES (${id_donacion}, ${productName}, ${quantity}, ${description}, ${expiryDate}, ${additionalComments}, '1111111111', ${userId})
        `;
        return NextResponse.json({ message: 'Donación registrada exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al registrar donación:', error);
        return NextResponse.json({ error: 'Error al registrar donación' }, { status: 500 });
    }
}