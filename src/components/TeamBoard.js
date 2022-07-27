import TeamProfiles from "./TeamProfiles";
import { useState } from 'react'
import { useSelector} from 'react-redux';

// import {Leaderboard} from './ScoreDb';
import {getTeamScoreBoardStats} from '../features/stats/statsSlice'

function TeamBoard() {
  
  const Leaderboard = useSelector(getTeamScoreBoardStats)

  const [filterScores, setFilterScores] = useState(0)

  const between = (data, between) => {
    let filter = data.filter(dat => 
        dat.team === between
    )
    if (filterScores == 0) {
      return Leaderboard
    }

    // sort with asending order
    return filter.sort((a, b) => {
        if ( a.score === b.score){
            return b.score - a.score;
        } else{
            return b.score - a.score;
        }
    })

}

  const handleClick = (e) => {
    setFilterScores(e.target.dataset.id)
  }
  
    return (
    <>
    <div className="board">
      <h1 className="leaderboard">Team Standings</h1>
  
      <div className="duration">
        <button onClick={handleClick} data-id="0">All Teams</button>
      </div>
    
      <TeamProfiles Leaderboard={between(Leaderboard, filterScores)}></TeamProfiles>

    </div>
    </>
  )
}

export default TeamBoard;