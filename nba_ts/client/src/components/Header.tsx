const Header = () => {
  return (
    <header>
        <div className=" bg-dark-primary p-5 flex justify-between items-center">
            <h1 className="text-4xl text-white font-bold">NBA Players</h1>
            <div className="flex items-center">
            <div className="mr-4">
                <a href="/" className="text-white hover:text-nba-gray">Home</a>
            </div>
            <div>
                <a href="/addPlayer" className="text-white hover:text-nba-gray">Add Player</a>
            </div>
            </div>
        </div>

    </header>
  );
};

export default Header;