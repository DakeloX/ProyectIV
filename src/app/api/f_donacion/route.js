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
    try {
        const { userId, productName, description, quantity, weight, expiryDate, additionalComments,idFundacion } = await request.json();
        
        // Generar el ID de la donación
        const id_donacion = generarID(8);

        // Calcular el peso total de la donación
        const pesoTotal = quantity * weight;

        // Insertar la donación en la base de datos
        const result = await sql`
            INSERT INTO donacion (id_donacion, nombre_producto, cantidad, peso_total, descripcion, fecha_caducidad, additional_comments, fundacion_id_fundacion, user_id_user, estado)
            VALUES (${id_donacion}, ${productName}, ${quantity}, ${pesoTotal}, ${description}, ${expiryDate}, ${additionalComments}, ${idFundacion}, ${userId}, 1)
        `;

        return NextResponse.json({ message: 'Donación registrada exitosamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al registrar donación:', error);
        return NextResponse.json({ error: 'Error al registrar donación' }, { status: 500 });
    }
}