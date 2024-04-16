import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "../../utils/isValidEmail";
import { messages } from "../../utils/messages";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sql } from '@vercel/postgres';

export async function POST(request) {

  const { email, password, username, id_user, telefono } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

    try {
     

      const result = await sql`
        INSERT INTO "user" (id_user, username, email, password, telefono, roles_id_rol)
        VALUES (${id_user}, ${username}, ${email}, ${hashedPassword}, ${telefono}, 1)
      `;
      return NextResponse.json({ message: 'User inserted successfully' }, { status: 200 });

    } catch (error) {
      console.error('Error inserting user:', error);
      return NextResponse.json({ error: 'Error inserting user' }, { status: 500 });
    }

}
