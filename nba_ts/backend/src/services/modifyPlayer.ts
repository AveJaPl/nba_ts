import { IPlayer } from "../../interfaces/IPlayer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const modifyPlayer = async (oldPlayer: IPlayer, newPlayer: IPlayer) => {
    console.log(newPlayer);
    if (!newPlayer.salary) {
        newPlayer.salary = oldPlayer.salary;
    }

    try{
        const modifiedPlayer = await prisma.players.update({
            where: {
                id: oldPlayer.id
            },
            data: newPlayer
        });
        console.log('Player modified in db: ');
        return modifiedPlayer;
    } catch (error) {
        console.log(error)
    }

}