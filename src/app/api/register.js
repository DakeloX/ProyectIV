import { db } from '../db'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { id_user, username, email, password, telefono, fechanacimiento, roles_id_rol } = req.body;

    try {
        await db.query(
            'INSERT INTO users (id_user, username, email, password, telefono, fechanacimiento, roles_id_rol) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id_user, username, email, password, telefono, fechanacimiento, roles_id_rol]
        );
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
