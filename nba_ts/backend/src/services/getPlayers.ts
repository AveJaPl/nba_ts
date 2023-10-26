import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPlayers = async () => {
    try{
        const players = await prisma.players.findMany({
            select: {
                id: true,
                name: true,
                surname: true,
                salary: true,
                nationality: true,
                imagePath: true,
                team: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        });
    
        console.log('Dataa recieved from db: ');
        return players;
    } catch (error) {
        console.log(error)
    }
    
}