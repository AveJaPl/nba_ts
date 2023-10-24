import { db_config } from "../db_config";
import {createConnection} from "mysql2/promise";
import { IPlayer } from "../interfaces/IPlayer";

export const addPlayer = async (player: IPlayer) => {
    console.log(player)
    const connection = await createConnection(db_config);
    const [rows, fields] = await connection.query("INSERT INTO players SET ?", player);
    console.log('Player added to Db');
    await connection.end();

}