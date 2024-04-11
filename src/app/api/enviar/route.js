import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {

  try {
    await sql`INSERT INTO "user" (id_user, username, email, password, telefono,  roles_id_rol )
    VALUES ( '123', 'Damian', 'email@email', '123465', '0123456798', 1 );`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const user = await sql`SELECT * FROM "user";`;
  return NextResponse.json({ user }, { status: 200 });
}