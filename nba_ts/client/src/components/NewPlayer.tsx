import React, { useState, ChangeEvent, useEffect } from "react";
import Team from "../interfaces/Team";
import axios from "axios";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const NewPlayer: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,   // początkowa pozycja X
    y: 0,   // początkowa pozycja Y
    height: 155,
    width: 115,
    });
  
    
  const [teams, setTeams] = useState<Team[]>([]);
  
  const inputClass = "hover:bg-nba-blue hover:text-white mt-1 w-full p-3 border rounded-md text-lg ";
  const labelClass = "block text-nba-gray text-lg font-medium mb-2";

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
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
            // Obraz jest węższy lub ma takie same proporcje jak docelowy wymiar
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
  };

  useEffect(() => {
    axios.post("http://localhost:3000/getAllTeams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              aspect = {115/155 as number}
              locked = {true}
            ><img src={imagePreview} style={{height: '155px'}}/></ReactCrop>
            
          )}

          <button className="mt-4 w-full bg-nba-red hover:text-nba-gray text-white p-3 rounded text-lg transition duration-300">
            Add New Player
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPlayer;