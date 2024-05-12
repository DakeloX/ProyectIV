// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';

// export async function GET(request) {
//     try {
//         // Eliminar tabla de rastreos
//         await sql`
//             DROP TABLE IF EXISTS rastreo;
//         `;

//         // Eliminar tabla de vehículos
//         await sql`
//             DROP TABLE IF EXISTS vehiculo;
//         `;

//         // Eliminar tabla de estados
//         await sql`
//             DROP TABLE IF EXISTS estado;
//         `;

//         // Eliminar tabla de donaciones
//         await sql`
//             DROP TABLE IF EXISTS donacion;
//         `;

//         // Eliminar tabla de fundaciones
//         await sql`
//             DROP TABLE IF EXISTS fundacion;
//         `;

//         // Eliminar tabla de usuarios
//         await sql`
//             DROP TABLE IF EXISTS "user";
//         `;

//         // Eliminar tabla de roles
//         await sql`
//             DROP TABLE IF EXISTS roles;
//         `;

//         return NextResponse.json({ message: "Tablas borradas exitosamente" }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: error.message || 'Ocurrió un error al crear las tablas' }, { status: 500 });
//     }
// }