import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import EditPlayer from "../pages/EditPlayer";
import Header from "../components/Header";
import NewPlayer from "../components/NewPlayer";
import DeletePlayer from "../components/DeletePlayer";


const AppRoutes = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editPlayer/:id" element={<EditPlayer/>} />
                <Route path="/addPlayer" element={<NewPlayer/>} />
                <Route path="/deletePlayer/:id" element={<DeletePlayer/>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
