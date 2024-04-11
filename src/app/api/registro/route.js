import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { id_user, username, email, password, telefono } = await request.json();

  try {
    await sql`INSERT INTO "user" (id_user, username, email, password, telefono,  roles_id_rol )
    VALUES (${id_user}, ${username}, ${email}, ${password}, ${telefono}, 1)`;

    // Si la inserción se realiza correctamente, devuelve una respuesta exitosa
    return NextResponse.json({ message: 'User inserted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting user:', error);
    // En caso de error, devuelve una respuesta de error
    return NextResponse.json({ error: 'Error inserting user' }, { status: 500 });
  }
}