import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sql } from '@vercel/postgres';

export async function POST(request) {

  const { email, password, username, id_user, telefono, departamento, ciudad } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const result = await sql`
        INSERT INTO "user" (id_user, username, email, password, telefono, departamento, ciudad, roles_id_rol)
        VALUES (${id_user}, ${username}, ${email}, ${hashedPassword}, ${telefono}, ${departamento}, ${ciudad}, 1)
      `;
      return NextResponse.json({ message: 'User inserted successfully' }, { status: 200 });

    } catch (error) {
      console.error('Error inserting user:', error);
      return NextResponse.json({ error: 'Error inserting user' }, { status: 500 });
    }

}