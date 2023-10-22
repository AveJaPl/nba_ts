import { db_config } from "../db_config";
import { createConnection } from "mysql2/promise";
import { IPlayer } from "../interfaces/IPlayer";

export const getPlayer = async (id: number) => {
    const connection = await createConnection(db_config);
    const [rows] = await connection.query("SELECT * FROM players p WHERE p.id = ?", [id]);
    console.log('Data received from Db');
    await connection.end();
    return rows as IPlayer[];
}