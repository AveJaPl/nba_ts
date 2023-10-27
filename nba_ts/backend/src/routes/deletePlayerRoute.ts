import express, { Request, Response } from 'express';
import { deletePlayer } from '../services/deletePlayer';

const DeletePlayerRouter = express.Router();

DeletePlayerRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await deletePlayer(id);
        res.status(200).send({ message: "Player successfully deleted." });
    } catch (e) {
        if (e instanceof Error && e.message === "Player not found") {
            res.status(404).send('Player not found!');
        } else {
            res.status(500).send('Something broke!');
        }
    }
});


export default DeletePlayerRouter;