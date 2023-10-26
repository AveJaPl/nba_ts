import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getTeams = async () => {
    const teams = await prisma.teams.findMany({
        select: {
            id: true,
            name: true,
            players: {
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
    return teams;
};