import React, {useState, ChangeEvent} from "react"
import AddPlayerProps from "../interfaces/AddPlayerProps"

const NewPlayer: React.FC<AddPlayerProps> = ({ teams }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="col-sm-4">
            <h3>Add New Player</h3>
            <form action="/addPlayer" method="post" encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control bg-dark text-white border-light"
                        id="name"
                        name="name"
                        placeholder="Enter name"
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <select
                        className="form-control bg-dark text-white border-light"
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
                    <label htmlFor="nationality">Nationality</label>
                    <input
                        type="text"
                        className="form-control bg-dark text-white border-light"
                        id="nationality"
                        name="nationality"
                        placeholder="Enter nationality"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="team">Team</label>
                    <select className="form-control bg-dark text-white border-light" id="team" name="team_id">
                        {teams.map(team => (
                            <option value={team.id} key={team.id}>{team.name}</option>
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
                        defaultValue={0}
                    />
                </div>
                <div className="custom-file mb-3">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="playerImageInput"
                        name="playerImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <label className="custom-file-label" htmlFor="playerImageInput">Wybierz zdjęcie...</label>
                </div>
                <div className="d-inline-block" style={{ width: '100%' }}>
                    <img
                        id="previewImage"
                        src={imagePreview || '#'}
                        alt="Podgląd wybranego zdjęcia"
                        style={{ width: '100%' }}
                    />
                </div>
                <button className="btn btn-primary w-100">Add Player</button>
            </form>
        </div>
    );
}

export default NewPlayer;