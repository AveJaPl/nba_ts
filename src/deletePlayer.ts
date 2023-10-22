import { db_config } from "../db_config";
import { createConnection } from "mysql2/promise";

export const deletePlayer = async (id: number) => {
    const connection = await createConnection(db_config);
    const [rows, fields] = await connection.query("DELETE FROM players WHERE id = ?", id);
    console.log('Player deleted from Db');
    await connection.end();
}