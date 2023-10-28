import { IPlayer } from "../../interfaces/IPlayer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const modifyPlayer = async (id: number, newPlayer: IPlayer) => {
    console.log(newPlayer);

    try{
        const modifiedPlayer = await prisma.players.update({
            where: {
                id: id
            },
            data: newPlayer
        });
        console.log('Player modified in db: ');
        return modifiedPlayer;
    } catch (error) {
        console.log(error)
    }

}