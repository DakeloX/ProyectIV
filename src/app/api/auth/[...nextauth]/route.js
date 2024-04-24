import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "text", } // Nuevo campo para el tipo de usuario
            },
            authorize: async (credentials, req) => {

                try {
                    // Determinar la tabla adecuada según el tipo de usuario
                    const tableName = credentials.userType === 'user' ? '"user"' : 'fundacion';

                    // Construir la consulta SQL manualmente escapando los valores de forma segura
                    const query = `
                        SELECT * FROM ${tableName} WHERE email = $1
                    `;
                    const result = await sql.query(query, [credentials.email]);

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

                    // Devolver los datos del usuario
                    return {
                        id: user.id_user,
                        email: user.email,
                        name: user.username,
                        userType: credentials.userType,
                    };
                } catch (error) {
                    console.error('Error al iniciar sesión:', error);
                    // Devolver un objeto con un mensaje de error y un estado de 500
                    return { error: 'Error al iniciar sesión' };
                }
            }
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
