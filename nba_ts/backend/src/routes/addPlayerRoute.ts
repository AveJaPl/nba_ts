import express, { Request, Response } from 'express';
import { addPlayer } from '../services/addPlayer';
import { IPlayer } from '../../interfaces/IPlayer';
import upload from '../../multer_config';

const AddPlayerRouter = express.Router();

AddPlayerRouter.post('/', upload.single('playerImage') ,async (req: Request, res: Response) => {
    try {
        let player: IPlayer = req.body;
        console.log(player.team_id);
        player.team_id = parseInt(player.team_id.toString());

        if (!player.salary) {
            player.salary = 0;
        }
        if (req.file) {
            player.imagePath = `/public/images/${req.file.filename}`
        }
        await addPlayer(player);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
    } finally {
        res.redirect('http://localhost:5173/')
    }
});

export default AddPlayerRouter;