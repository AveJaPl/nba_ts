import express, { Request, Response } from 'express';
import { addPlayer } from '../services/addPlayer';
import { IPlayer } from '../../interfaces/IPlayer';

const AddPlayerRouter = express.Router();

AddPlayerRouter.post('/', async (req: Request, res: Response) => {
    try {
        let player: IPlayer = req.body;

        if (!player.salary) {
            player.salary = 0;
        }
        if (req.file) {
            player.imagePath = req.file.path;
        }
        await addPlayer(player);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    } finally {
        res.redirect('/');
    }
});

export default AddPlayerRouter;