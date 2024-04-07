import { createClient } from '@vercel/postgres';

export async function getRoles() {
    const client = createClient({
        connectionString: process.env.POSTGRES_URL,
    });

    try {
        await client.connect();
        console.log('Conexión exitosa a la base de datos');

        const roles = await client.query({
            text: 'SELECT nombre_rol FROM roles',
        });
        console.log('Roles obtenidos correctamente:', roles.rows);

        return roles.rows.map((row) => row.nombre_rol);
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw new Error('Failed to fetch roles.');
    } finally {
        await client.end();
    }
}