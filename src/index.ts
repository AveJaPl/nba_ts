import express from 'express';
import { Request, Response } from 'express';
import { getPlayers } from './getPlayers';
import { getTeams } from './getTeams';
const app = express();
const port = 3000;
const path = require('path');

app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.get('/', async (req: Request, res: Response) => {
    try {
        const players = await getPlayers();
        console.log(players);
        const teams = await getTeams();

        res.render('index', { title: 'Strona Główna', message: 'Hello there!', players: players, teams: teams });
    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});