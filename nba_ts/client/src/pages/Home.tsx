import { useEffect, useState } from 'react';
import Player from '../interfaces/Player';
import axios from 'axios';
import '../styles/playerCard.css'

const Home = () => {
    const [players, setPlayers] = useState<Player[]>([]);


    useEffect(() => {
        Promise.all([
            axios.post("http://localhost:3000/getAllPlayers"),
        ]).then(([playersResponse]) => {
            setPlayers(playersResponse.data);
        }).catch((err) => {
            console.log(err);
        }
        );
    }, []);

    return (
        <div className=" bg-dark-primary h-full p-6">
            <div className=" bg-nba-gray container p-3 h-full">
                <h1 className="text-center mb-3 text-3xl font-bold">SIEMAA</h1>
                <div className="card-container">
                    {players.map((player) => (
                        <div key={player.id} className="card border-nba-red border rounded shadow-lg p-4">
                            <div className="">
                                <div className="">
                                    <h5 className="text-xl mb-2">
                                        {player.name} {player.surname}
                                    </h5>
                                    <h6 className="text-gray-300 mb-2">{player.position}</h6>
                                    <p>Nationality: {player.nationality}</p>
                                    <p>Team: {player.team?.name}</p>
                                    <p>
                                        Salary: 
                                        {player.salary >= 1000000 ? `${(player.salary / 1000000).toFixed(2)} mln` : 
                                         player.salary >= 1000 ? `${(player.salary / 1000).toFixed(2)} k` : player.salary}
                                    </p>
                                    <a href={`/editPlayer/${player.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded mr-2">EDIT</a>
                                    <a href={`/deletePlayer/${player.id}`} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">DELETE</a>
                                </div>
                                <div>
                                    {player.imagePath ? 
                                        <img src={player.imagePath} alt="Player" className="w-32 h-32 object-cover rounded" />
                                        :
                                        <img src="../public/placeholder/placeholder.png" alt="Placeholder" className="w-32 h-32 object-cover rounded" />
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
