import mysql from 'mysql2';

export const conn = mysql.createConnection({
    host: 'donappdb.cvuwmgsawd5x.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'receta123',
    port: 3308,
    database: 'sistema_donaciones'
});

