import "../styles/playerCard.css";
import AllPlayers from "../components/AllPlayers";

const Home = () => {
  

  return (
    <div className="bg-dark-primary h-full p-6">
      <div className="container p-3 h-full">
        <AllPlayers/>
      </div>
    </div>
  );
};

export default Home;
