import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import EditPlayer from "../pages/EditPlayer";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editPlayer/:id" element={<EditPlayer/>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
