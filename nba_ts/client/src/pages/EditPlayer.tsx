import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Player from "../interfaces/Player";
import Team from "../interfaces/Team";

const EditPlayer = () => {
    const { id } = useParams<{ id: string }>();
    const [player, setPlayer] = useState<Player | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const nbaPositions = ["PG", "SG", "SF", "PF", "C"];
    const inputClass = "hover:bg-nba-blue hover:text-white mt-1 w-full p-3 border rounded-md text-lg ";
    const labelClass = "block text-nba-gray text-lg font-medium mb-2o"
    useEffect(() => {
        Promise.all([
            axios.post(`http://localhost:3000/getPlayer/${id}`),
            axios.post("http://localhost:3000/getAllTeams")
        ]).then(([playerResponse, teamsResponse]) => {
            setPlayer(playerResponse.data);
            setTeams(teamsResponse.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    return (
        <div className=" bg-dark-primary h-screen w-full flex items-center justify-center m-auto">
            
            <div className="container mx-8 w-full md:w-1/2 lg:w-2/5">
            <div className="">
                <a href="/" className="text-nba-gray hover:text-nba-red text-3xl font-bold">X</a>
            </div>
                <div className="text-center mb-8 text-3xl font-bold text-nba-gray">
                    Edit Player
                </div>
                {player && (
                    <form action={`http://localhost:3000/editPlayer/${player.id}`} method="post">
                        <div className="mb-4">
                            <label className={labelClass}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                defaultValue={player.name}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="mb-4">
                            <label className={labelClass}>Surname</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Enter surname"
                                defaultValue={player.surname}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="mb-4">
                            <label className={labelClass}>Position</label>
                            <select
                                id="position"
                                name="position"
                                defaultValue={player.position}
                                required
                                className={inputClass}
                            >
                                {nbaPositions.map(position => (
                                    <option value={position} key={position}>
                                        {position}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className={labelClass}>Nationality</label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                placeholder="Enter nationality"
                                defaultValue={player.nationality}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="mb-4">
                            <label className={labelClass}>Team</label>
                            <select
                                id="team"
                                name="team_id"
                                defaultValue={player.team_id}
                                className={inputClass}
                            >
                                {teams.map((team) => (
                                    <option value={team.id} key={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className={labelClass}>Salary</label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                placeholder="Enter salary"
                                defaultValue={player.salary}
                                className={inputClass}
                            />
                        </div>

                        <button className="mt-4 w-full bg-nba-red hover:text-nba-gray text-white p-3 rounded text-lg transition duration-300">Update Player</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditPlayer;
