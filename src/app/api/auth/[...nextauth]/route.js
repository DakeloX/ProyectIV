import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "text" }
            },
            authorize: async (credentials) => {
                try {

                    
                    // Determinar la tabla y las columnas adecuadas según el tipo de usuario
                    const tableName = credentials.userType === 'user' ? '"user"' : 'fundacion';
                    const idColumnName = credentials.userType === 'user' ? 'id_user' : 'id_fundacion';
                    const emailColumnName = 'email';
                    const nameColumnName = credentials.userType === 'user' ? 'username' : 'nombre';

                    // Construir la consulta SQL manualmente escapando los valores de forma segura
                    const query = `
            SELECT * FROM ${tableName} WHERE ${emailColumnName} = $1
          `;
                    const result = await sql.query(query, [credentials.email]);

                    
                    if (result.rows.length === 0) {
                        // No se encontró ningún usuario con el correo electrónico proporcionado
                        return null;
                    }

                    const userData = result.rows[0];

                    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada
                    const passwordMatch = await bcrypt.compare(credentials.password, userData.password);

                    if (!passwordMatch) {
                        // La contraseña proporcionada no coincide con la contraseña almacenada
                        return null;
                    }

                    const payload = {
                        idUser: userData[idColumnName],
                        email: userData[emailColumnName],
                        name: userData[nameColumnName],
                        userType: credentials.userType,
                    };
                    
                    const claveSecreta = process.env.JWT_SECRET; // Esta debería ser una clave segura y privada
                    const opciones = {
                        expiresIn: '1d' // Opcional: tiempo de expiración del token (ejemplo: 1 hora)
                    };
                    
                    const token = jwt.sign(payload, claveSecreta, opciones);

                    const user = {
                        idUser: userData[idColumnName],
                        email: userData[emailColumnName],
                        name: userData[nameColumnName],
                        userType: credentials.userType,
                        token: token
                    }
                    // Devolver los datos del usuario con los datos adicionales
                    return user;
                } catch (error) {
                    console.error('Error al iniciar sesión:', error);
                    // Devolver un objeto con un mensaje de error y un estado de 500
                    return { error: 'Error al iniciar sesión' };
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },

    },

    pages: {
        signIn: "/pages/auth/login",
    },      
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };