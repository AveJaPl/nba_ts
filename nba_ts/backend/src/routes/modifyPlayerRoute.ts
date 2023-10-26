import express, { Request, Response } from 'express';
import { getPlayer } from '../services/getPlayer';
import { getTeams } from '../services/getTeams';

const ModifyPlayerRouter = express.Router();

ModifyPlayerRouter.get('/', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const player = await getPlayer(id);
    const teams = await getTeams();
    res.render('editPlayer', {
        message: 'Hello there!',
        player: player,
        teams: teams
    });
});
ModifyPlayerRouter.post('/', async (req: Request, res: Response) => {
    try {
       
    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    } finally {
        res.redirect('/');
    }
});

export default ModifyPlayerRouter;