import express, { Request, Response } from 'express';
import { getPlayer } from '../services/getPlayer';
import { modifyPlayer } from '../services/modifyPlayer';
import { IPlayer } from '../../interfaces/IPlayer';

const ModifyPlayerRouter = express.Router();

ModifyPlayerRouter.post('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        let player: IPlayer = req.body;
        console.log(player);
        player.team_id = parseInt(player.team_id.toString());
        if (!player.salary) {
            player.salary = 0;
        }
        await modifyPlayer(id, player);

    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    } finally {
        res.redirect('http://localhost:5173/');
    }
});

export default ModifyPlayerRouter;