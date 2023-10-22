import { createConnection } from "mysql2/promise";
import { db_config } from "../db_config";

export const getPlayers = async () => {
    const connection = await createConnection(db_config);
    const [rows, fields] = await connection.query("SELECT p.*, t.name as 'team' FROM players p INNER JOIN teams t ON p.team_id = t.id ORDER BY p.id DESC");
    console.log('Data received from Db');
    await connection.end();
    return rows;
}