import { db } from "../db";

export default async function handler(request, response){
    const client = await db.connect();

    try {
        // Confirma la conexión con la base de datos
        console.log('Conexión con la base de datos establecida correctamente');

        // Inserta un registro en la tabla "conexiones"
        await client.query(
            'INSERT INTO conexiones (estado) VALUES ($1)',
            ['exitoso']
        );

        return response.status(200).json({ message: 'Conexión exitosa y registro de conexión guardado en la base de datos' });
    } catch (error) {
        console.error('Error al establecer la conexión o guardar el registro de conexión:', error);
        return response.status(500).json({ error });
    } finally {
        // Importante liberar el cliente después de usarlo
        client.release();
    }
}