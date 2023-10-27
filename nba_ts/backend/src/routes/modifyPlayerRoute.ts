import express, { Request, Response } from 'express';
import { getPlayer } from '../services/getPlayer';
import { getTeams } from '../services/getTeams';

const ModifyPlayerRouter = express.Router();

ModifyPlayerRouter.post('/:id', async (req: Request, res: Response) => {
    try {
        console.log('hej tu post')
       const id = parseInt(req.body.id);
       console.log(id);
       const player = await getPlayer(id);
        console.log(player);
        const teams = await getTeams();
        console.log(teams);

    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    } finally {
        res.redirect('/');
    }
});

export default ModifyPlayerRouter;