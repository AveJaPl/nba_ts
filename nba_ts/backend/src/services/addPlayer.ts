import { IPlayer } from "../../interfaces/IPlayer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addPlayer = async (player: IPlayer) => {
    console.log(player)
    try{
        const newPlayer = await prisma.players.create({
            data: player
        });
        console.log('New player added to db: ');
        return newPlayer;
    } catch (error) {
        console.log(error)
    }


}