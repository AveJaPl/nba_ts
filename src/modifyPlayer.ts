import { db_config } from "../db_config";
import {createConnection} from "mysql2/promise";
import { IPlayer } from "../interfaces/IPlayer";

export const modifyPlayer = async (oldPlayer: IPlayer, newPlayer: IPlayer) => {
    console.log(newPlayer);
    if (!newPlayer.salary) {
        newPlayer.salary = oldPlayer.salary;
    }

    const connection = await createConnection(db_config);
    // update old player data to new player data:
    const [rows, fields] = await connection.query("UPDATE players SET ? WHERE id = ?", [newPlayer, oldPlayer.id]);

    console.log('Player modified');
    await connection.end();

}