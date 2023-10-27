
const Home = () => {
    return (
        <div className="bg-dark text-white d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="text-center">NBA Players CRUD App</h1>
                        <h3 className="text-center">by <a href="" target="_blank" rel="noopener noreferrer">Filip Piatek</a></h3>
                        <div className="d-flex justify-content-center mt-5">
                        <a href="/editPlayer/3" className="btn btn-success btn-lg">Modify Player</a><br /><br />

                            <a href="/showAllPlayers" className="btn btn-success btn-lg">Show all players</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home