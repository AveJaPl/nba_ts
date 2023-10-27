import express from 'express';
import { getPlayers } from '../services/getPlayers';

const getAllPlayersRouter = express.Router();

getAllPlayersRouter.get('/', async (req, res) => {
    try {
        const allPlayers = await getPlayers();
        res.json(allPlayers);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    }
});

export default getAllPlayersRouter;