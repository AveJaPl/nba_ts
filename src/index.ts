import express from 'express';
import { Request, Response } from 'express';
import { getPlayers } from './getPlayers';
import { getTeams } from './getTeams';
import { addPlayer } from './addPlayer';
import { deletePlayer } from './deletePlayer';
import bodyParser from 'body-parser';
import { getPlayer } from './getPlayer';
import { IPlayer } from '../interfaces/IPlayer';
import { modifyPlayer } from './modifyPlayer';
import {upload} from '../multer_config';

const app = express();
const port = 3000;
const path = require('path');
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.get('/', async (req: Request, res: Response) => {
    try {
        const players = await getPlayers();
        const teams = await getTeams();
        console.log(players);
        res.render('index', { title: 'Strona Główna', message: '', players: players, teams: teams });
    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    }
});

app.post('/addPlayer', upload.single('playerImage'), async (req: Request, res: Response) => {
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

app.get('/deletePlayer/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        await deletePlayer(id);
        res.redirect('/');
});

app.get('/editPlayer/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const player = await getPlayer(id);
    const teams = await getTeams();
    res.render('editPlayer', {
        message: 'Hello there!',
        player: player[0],
        teams: teams
    });
});
app.post('/editPlayer/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const player = await getPlayer(id);
        await modifyPlayer(player[0], req.body);

    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    } finally {
        res.redirect('/');
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});