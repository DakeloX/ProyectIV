import { NextResponse } from "next/server";
import { conn } from '../../libs/mysql';

export async function GET() {
    try {
        const result = await conn.promise().query('SELECT NOW()');
        console.log(result);
        return NextResponse.json({ });
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        return NextResponse.json({ error: "Error al ejecutar la consulta" }, { status: 500 });
    }
}
