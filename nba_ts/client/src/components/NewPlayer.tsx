import React, { useState, ChangeEvent, useEffect } from "react";
import Team from "../interfaces/Team";
import axios from "axios";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const NewPlayer: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0, // początkowa pozycja X
    y: 0, // początkowa pozycja Y
    height: 155,
    width: 115,
  });

  const [teams, setTeams] = useState<Team[]>([]);

  const inputClass =
    "hover:bg-nba-blue hover:text-white mt-1 w-full p-3 border rounded-md text-lg ";
  const labelClass = "block text-nba-gray text-lg font-medium mb-2";

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setImagePreview(reader.result as string);

        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const targetAspect = 115 / 155;
          const imageAspect = img.width / img.height;

          if (imageAspect > targetAspect) {
            // Obraz jest szerszy niż docelowy wymiar
            const cropHeight = 100;
            const cropWidth = (cropHeight * targetAspect) / imageAspect;
            const cropX = (100 - cropWidth) / 2;

            setCrop({
              unit: "%",
              x: cropX,
              y: 0,
              width: cropWidth,
              height: cropHeight,
            });
          } else {
            setCrop({
              unit: "%",
              x: 0,
              y: 0,
              width: 115,
              height: 155,
            });
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCrop = (crop: Crop) => {
    setCrop(crop);
    fillCanvas(crop);
  };

  useEffect(() => {
    axios
      .post("http://localhost:3000/getAllTeams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fillCanvas = (crop: Crop) => {
    const canvas = document.getElementById("croppedImage") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx || !originalImage) return;

    const img = new Image();
    img.src = originalImage;

    img.onload = () => {
        const scale = img.height / 155;
        console.log(scale);
        const cropWidthScaled = crop.width * scale;
        const cropHeightScaled = crop.height * scale;
        const cropXScaled = crop.x * scale;
        const cropYScaled = crop.y * scale;

        console.log("Nowa szerokość: " + cropWidthScaled + ", nowa wysokość: " + cropHeightScaled + ", nowy X: " + cropXScaled + ", nowy Y: " + cropYScaled);
        // Tworzenie tymczasowego płótna
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d")!;
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;

        // Rysowanie obrazu na tymczasowym płótnie z przeskalowanymi wymiarami
        tempCtx.drawImage(img, 0, 0);
        
        canvas.width = 115;
        canvas.height = 155;

        // Teraz używamy tymczasowego płótna jako źródła do rysowania na docelowym płótnie
        ctx.drawImage(tempCanvas, cropXScaled, cropYScaled, cropWidthScaled, cropHeightScaled, 0, 0, canvas.width, canvas.height);


        const base64Image = canvas.toDataURL("image/jpeg", 1.0);
        const inputElement = document.getElementById("base64Image") as HTMLInputElement;
        if (inputElement) {
            inputElement.value = base64Image;
        }

    };
};

  return (
    <div className="bg-dark-primary h-screen w-full flex justify-center m-auto">
      <div className="container mx-8 w-full md:w-1/2 lg:w-2/5">
        <div className="text-center mb-8 text-3xl font-bold text-nba-gray">
          Add New Player
        </div>
        <form
          action="http://localhost:3000/addPlayer"
          method="post"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label className={labelClass}>Name</label>
            <input
              type="text"
              className={inputClass}
              id="name"
              name="name"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group">
            <label className={labelClass}>Surname</label>
            <input
              type="text"
              className={inputClass}
              id="surname"
              name="surname"
              placeholder="Enter surname"
              required
            />
          </div>
          <div className="form-group">
            <label className={labelClass}>Position</label>
            <select
              className={inputClass}
              id="position"
              name="position"
              required
            >
              <option value="PG">PG</option>
              <option value="SG">SG</option>
              <option value="SF">SF</option>
              <option value="PF">PF</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="form-group">
            <label className={labelClass}>Nationality</label>
            <input
              type="text"
              className={inputClass}
              id="nationality"
              name="nationality"
              placeholder="Enter nationality"
              required
            />
          </div>
          <div className="form-group">
            <label className={labelClass}>Team</label>
            <select className={inputClass} id="team" name="team_id">
              {teams.map((team) => (
                <option value={team.id} key={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className={labelClass}>Salary</label>
            <input
              type="number"
              className={inputClass}
              id="salary"
              name="salary"
              placeholder="Enter salary"
              defaultValue={0}
            />
          </div>
          <div className="custom-file mb-3">
            <input
              type="file"
              className={inputClass}
              id="playerImageInput"
              name="playerImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {imagePreview && (
            <ReactCrop
              crop={crop}
              onChange={handleImageCrop}
              aspect={(115 / 155) as number}
              locked={true}
            >
              <img src={imagePreview} style={{ height: "155px" }} />
            </ReactCrop>
          )}
          <canvas
            id="croppedImage"
            className="hidden"
          ></canvas>
          <input type="hidden" id="base64Image" name="base64Image"/>

          <button className="mt-4 w-full bg-nba-red hover:text-nba-gray text-white p-3 rounded text-lg transition duration-300">
            Add New Player
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPlayer;
