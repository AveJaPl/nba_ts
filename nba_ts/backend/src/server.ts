import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AddPlayerRouter from './routes/addPlayerRoute';
import ModifyPlayerRouter from './routes/modifyPlayerRoute';
import DeletePlayerRouter from './routes/deletePlayerRoute';
import getAllPlayersRouter from './routes/getAllPlayers';
import getAllTeamsRouter from './routes/getAllTeams';
import GetPlayerRouter from './routes/getPlayerRoute';
const app = express();
app.use(cors())
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('json spaces', 2);

app.use('/getAllPlayers', getAllPlayersRouter)
app.use('/getAllTeams', getAllTeamsRouter)
app.use('/addPlayer', AddPlayerRouter);
app.use('/deletePlayer/', DeletePlayerRouter);
app.use('/editPlayer/', ModifyPlayerRouter);
app.use('/getPlayer/', GetPlayerRouter);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
