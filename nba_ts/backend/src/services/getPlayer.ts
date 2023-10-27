import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getPlayer = async (id: number) => {

    try{
        const player = await prisma.players.findUnique({
            where: {id}
        });
        console.log('Player found in db:', player?.name);
        return player;
    } catch (error) {
        console.log(error)
    }

}