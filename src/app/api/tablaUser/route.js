import { db } from "@vercel/postgres";

export default async function handler(request, response){
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const client = await db.connect();

    try {
        const result = await client.query('SELECT * FROM roles');
        const roles = result.rows;
        console.log('Roles registrados:', roles);
        return response.status(200).json(roles);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        return response.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        client.release();
    }
}