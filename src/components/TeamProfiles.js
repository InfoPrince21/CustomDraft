
const TeamProfiles = ({Leaderboard}) => {

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
                            <h3>{value.team}</h3>
                        </div>
                    </div>
                    <div className="item">
                        <h3>{value.score}</h3>
                    </div>
                </div>
            )
          }
        )}
    </div>
    </>
  )
};

export default TeamProfiles;