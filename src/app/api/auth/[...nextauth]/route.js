import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, req) => {

                try {
                    // Buscar usuario por correo electrónico
                    const result = await sql`
                        SELECT * FROM "user" WHERE email = ${credentials.email}
                    `;

                    if (result.rows.length === 0) {
                        // No se encontró ningún usuario con el correo electrónico proporcionado
                        return null;
                    }

                    const user = result.rows[0];

                    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada
                    const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                    if (!passwordMatch) {
                        // La contraseña proporcionada no coincide con la contraseña almacenada
                        return null;
                    }
                    return {
                        id: user.id_user,
                        email: user.email,
                        name: user.username,
                    }
                } catch (error) {
                    console.error('Error al iniciar sesión:', error);
                    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
                }
            }
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
