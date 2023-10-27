import express from 'express';
import { getTeams } from '../services/getTeams';

const getAllTeamsRouter = express.Router();

getAllTeamsRouter.post('/', async (req, res) => {
    try {
        const allTeams = await getTeams();
        res.send(allTeams);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    }
});

export default getAllTeamsRouter;