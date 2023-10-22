import { db_config } from "../db_config";
import { createConnection } from "mysql2/promise";
export const getTeams = async () => {
    const connection = await createConnection(db_config);
    const [rows, fields] = await connection.query("SELECT * FROM teams");
    console.log('Data received from Db');
    await connection.end();
    return rows;
};