import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Player from "../interfaces/Player";
import Team from "../interfaces/Team";

const EditPlayer = () => {
    const { id } = useParams<{ id: string }>();
    const [player, setPlayer] = useState<Player | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const nbaPositions = ["PG", "SG", "SF", "PF", "C"];

    useEffect(() => {
        setLoading(true);

        Promise.all([
            axios.post(`http://localhost:3000/getPlayer/${id}`),
            axios.post("http://localhost:3000/getAllTeams")
        ]).then(([playerResponse, teamsResponse]) => {
            setPlayer(playerResponse.data);
            setTeams(teamsResponse.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    return (
        <div className="h-screen flex items-center justify-center bg-dark text-white">
            <div className="container mx-auto">
                <div className="text-center mb-12 text-2xl font-bold">
                    Edit Player
                </div>
                {player && (
                    <form action={`http://localhost:3000/editPlayer/${player.id}`} method="post">
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                defaultValue={player.name}
                                required
                                className="mt-1 p-3 w-full border rounded-md text-lg"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="surname" className="block text-lg font-medium mb-2">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Enter surname"
                                defaultValue={player.surname}
                                required
                                className="mt-1 p-3 w-full border rounded-md text-lg"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="position" className="block text-lg font-medium mb-2">Position</label>
                            <select
                                id="position"
                                name="position"
                                defaultValue={player.position}
                                required
                                className="mt-1 p-3 w-full border rounded-md text-lg"
                            >
                                {nbaPositions.map(position => (
                                    <option value={position} key={position}>
                                        {position}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="nationality" className="block text-lg font-medium mb-2">Nationality</label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                placeholder="Enter nationality"
                                defaultValue={player.nationality}
                                required
                                className="mt-1 p-3 w-full border rounded-md text-lg"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="team" className="block text-lg font-medium mb-2">Team</label>
                            <select
                                id="team"
                                name="team_id"
                                className="mt-1 p-3 w-full border rounded-md text-lg"                             defaultValue={player.team_id}
                            >
                                {teams.map((team) => (
                                    <option value={team.id} key={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-8">
                            <label htmlFor="salary" className="block text-lg font-medium mb-2">Salary</label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                placeholder="Enter salary"
                                defaultValue={player.salary}
                                className="mt-1 p-3 w-full border rounded-md text-lg"
                            />
                        </div>
                        <button className="mx-auto block bg-blue-500 text-white p-3 rounded text-lg w-1/2">Update Player</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditPlayer;
