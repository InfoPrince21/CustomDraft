
const Profiles = ({Leaderboard}) => {

    return (
    <>
    <div id="profile">
        {
          Leaderboard.map((value, index) => {
            
            return (
                <div className="flex" key={index}>
                    <div className="item">
                        {/* <img src={value.img} alt="" /> */}
                        <div className="info">
                            <h3 className="name text-dark">{value.name}</h3>
                            <span>{value.location}</span>
                        </div>
                    </div>
                    <div className="item">
                        <span>{value.score}</span>
                    </div>
                </div>
            )
          }
        )}
    </div>
    </>
  )
};

export default Profiles;