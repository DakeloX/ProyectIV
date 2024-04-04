import { db } from "@vercel/postgres";

export default async function handler(request, response){
    const client = await db.connect();

    try{
        await client.sql`CREATE TABLE user (nombre varchar(255), email varchar(50), password varchar(15) );`;
        console.log('Creada tabla con exito')
    } catch (error){
        return response.status(500).json({ error });
    }
}