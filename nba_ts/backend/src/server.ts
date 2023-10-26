import express from 'express';
import { Request, Response } from 'express';
import { getPlayers } from './services/getPlayers';
import { getTeams } from './services/getTeams';
import bodyParser from 'body-parser';
import AddPlayerRouter from './routes/addPlayerRoute';
import ModifyPlayerRouter from './routes/modifyPlayerRoute';
import DeletePlayerRouter from './routes/deletePlayerRoute';
import getAllPlayersRouter from './routes/getAllPlayers';
const app = express();
const port = 3000;
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 2);

app.use('/getAllPlayers', getAllPlayersRouter)
//  upload.single('playerImage'),
app.use('/addPlayer', AddPlayerRouter );
app.use('/deletePlayer/:id', DeletePlayerRouter);
app.use('/editPlayer/:id', ModifyPlayerRouter);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});