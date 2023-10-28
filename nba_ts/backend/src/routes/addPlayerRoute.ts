import express, { Request, Response } from "express";
import { addPlayer } from "../services/addPlayer";
import { IPlayer } from "../../interfaces/IPlayer";
import upload from "../../multer_config";
import fs from "fs";
const AddPlayerRouter = express.Router();

AddPlayerRouter.post(
  "/",
  upload.single("playerImage"),
  async (req: Request, res: Response) => {
    try {
      const canvasImage = req.body.base64Image;
      console.log(canvasImage);
      delete req.body.base64Image;

      let player: IPlayer = req.body;
      player.team_id = parseInt(player.team_id.toString());
      if (!player.salary) {
        player.salary = 0;
      }
      if (req.file) {
        player.imagePath = `/images/${req.file.filename}`;
      }
      if (canvasImage) {
        const formatMatch = canvasImage.match(
          /^data:image\/(png|jpeg|jpg);base64,/
        );
        const format = formatMatch ? formatMatch[1] : null;

        const base64Image = canvasImage.replace(
          /^data:image\/(png|jpeg|jpg);base64,/,
          ""
        );

        const filename = `player-${Date.now()}.${format}`;


        const imagePath = `../client/public/images/${filename}`;
        const imagePathFront = `./images/${filename}`;

        const buffer = Buffer.from(base64Image, "base64");
        fs.writeFileSync(imagePath, buffer);

        player.imagePath = imagePathFront;
      }

      await addPlayer(player);
    } catch (e) {
      console.log(e);
      res.status(500).send("Something broke!");
    } finally {
      res.redirect("http://localhost:5173/");
    }
  }
);

export default AddPlayerRouter;
