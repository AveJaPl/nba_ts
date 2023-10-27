import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const DeletePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const deletePlayer = async () => {
        try {
            await axios.delete(`http://localhost:3000/deletePlayer/${id}`);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=" bg-dark-primary h-screen w-full flex flex-col items-center text-nba-gray">
            <h1 className=" text-xl text-nba-gray">Delete Player</h1>
            <p className='mt-4'>Are you sure you want to delete this player?</p>
            <button className="mt-4 w-full bg-nba-red hover:text-nba-gray text-white p-3 rounded text-lg transition duration-300" onClick={deletePlayer}>Delete</button>
        </div>
    )
}


export default DeletePlayer