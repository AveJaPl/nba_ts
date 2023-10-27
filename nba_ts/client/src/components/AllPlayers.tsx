import { useEffect, useState } from "react";
import Player from "../interfaces/Player";
import axios from "axios";
import "../styles/playerCard.css";
import placeholder from "../assets/placeholder/placeholder.png";

const AllPlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    Promise.all([axios.post("http://localhost:3000/getAllPlayers")])
      .then(([playersResponse]) => {
        setPlayers(playersResponse.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="card-container">
      {players.map((player) => (
        <div
          key={player.id}
          className="card text-nba-gray bg-dark-secondary border-nba-blue border-s-8 rounded shadow-lg p-4"
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex">
              <div className="flex-1">
                <h5 className="text-xl mb-2">
                  {player.name} {player.surname}
                </h5>
                <h6 className="text-gray-300 mb-2">{player.position}</h6>
                <p>Nationality: {player.nationality}</p>
                <p>Team: {player.team?.name}</p>
                <p>
                  Salary:
                  {player.salary >= 1000000
                    ? `${(player.salary / 1000000).toFixed(2)} mln`
                    : player.salary >= 1000
                    ? `${(player.salary / 1000).toFixed(2)} k`
                    : player.salary}
                </p>
              </div>
              <div className="">
                {player.imagePath ? (
                  <img
                    src={player.imagePath}
                    alt="Player"
                    className="w-32 h-32 object-cover rounded"
                  />
                ) : (
                  <img
                    src={placeholder}
                    alt="Placeholder"
                    className=" w-28 h-40 rounded"
                  />
                )}
              </div>
            </div>

            <div className="flex mt-3 justify-end">
              <a
                href={`/editPlayer/${player.id}`}
                className=" bg-nba-blue text-white hover:text-nba-gray px-3 py-1.5 rounded mr-2"
              >
                EDIT
              </a>
              <a
                href={`/deletePlayer/${player.id}`}
                className=" bg-nba-red hover:text-nba-gray text-white py-1.5 px-3 rounded"
              >
                DELETE
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPlayers;
