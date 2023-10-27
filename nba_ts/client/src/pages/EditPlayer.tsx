import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Player from "../interfaces/Player";
import Team from "../interfaces/Team";


const EditPlayer = () => {
    const {id} = useParams<{id: string}>();
    const [player, setPlayer] = useState<Player | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
        <div className="bg-dark text-white d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            hello
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="text-center">Edit Player</h3>
                        {player && (
                            <form action={`http://localhost:3000/editPlayer/${player.id}`} method="post">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white border-light"
                                        id="name"
                                        name="name"
                                        placeholder="Enter name"
                                        defaultValue={player.name}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="surname">Surname</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white border-light"
                                        id="surname"
                                        name="surname"
                                        placeholder="Enter surname"
                                        defaultValue={player.surname}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="position">Position</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white border-light"
                                        id="position"
                                        name="position"
                                        placeholder="Enter position"
                                        defaultValue={player.position}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nationality">Nationality</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white border-light"
                                        id="nationality"
                                        name="nationality"
                                        placeholder="Enter nationality"
                                        defaultValue={player.nationality}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team">Team</label>
                                    <select className="form-control bg-dark text-white border-light" id="team" name="team_id">
                                        {teams.map((team) => (
                                            <option value={team.id} key={team.id} selected={team.id === player.team_id}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="salary">Salary</label>
                                    <input
                                        type="number"
                                        className="form-control bg-dark text-white border-light"
                                        id="salary"
                                        name="salary"
                                        placeholder="Enter salary"
                                        defaultValue={player.salary}
                                    />
                                </div>
                                <button className="btn btn-primary mx-auto d-block">Update Player</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPlayer;