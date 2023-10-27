import { createConnection } from "mysql2/promise";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deletePlayer = async (id: number) => {

    try{
        const deletedPlayer = await prisma.players.delete({
            where: {
                id: id
            }
        });
        console.log('Player deleted from db: ', deletePlayer?.name);
        return deletedPlayer;
    
   } catch (error) {
        console.log(error)
   }
}