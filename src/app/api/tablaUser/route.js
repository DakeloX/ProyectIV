import { db } from "@vercel/postgres";

export default async function handler(request, response){
    const client = await db.connect();

    try{
        await client.sql`INSERT INTO user (nombre, email, password) VALUES ("miguel", "email@email.com", "password");`;
        console.log('Insercion de dato con exito')
    } catch (error){
        return response.status(500).json({ error });
    }
}