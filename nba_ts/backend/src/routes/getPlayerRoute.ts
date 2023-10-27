import express, { Request, Response } from 'express';
import { getPlayer } from '../services/getPlayer';

const DeletePlayerRouter = express.Router();

DeletePlayerRouter.post('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const player = await getPlayer(id);

    res.send(player);
});

export default DeletePlayerRouter;