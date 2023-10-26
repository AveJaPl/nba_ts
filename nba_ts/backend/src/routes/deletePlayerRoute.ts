import express, { Request, Response } from 'express';
import { deletePlayer } from '../services/deletePlayer';

const DeletePlayerRouter = express.Router();

DeletePlayerRouter.get('/', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await deletePlayer(id);
    res.redirect('/');
});

export default DeletePlayerRouter;