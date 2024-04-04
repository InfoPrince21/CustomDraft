import Profiles from "./Profiles";
import { useState } from 'react'
import { useSelector} from 'react-redux';

import {getScoreBoardStats} from '../features/stats/statsSlice'

function Board() {
  
  const Leaderboard = useSelector(getScoreBoardStats)

  const [filterScores, setFilterScores] = useState(0)

  const between = (data, between) => {
    let filter = data.filter(dat => 
        dat.team === between
    )
    if (filterScores == 0) {
      return Leaderboard
    }

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
      <h1 className="leaderboard">Leaders</h1>
  
      <div className="duration">
        <button onClick={handleClick} data-id="0">All Players</button>
        <button onClick={handleClick} data-id="Cowboys">Cowboys</button>
        <button onClick={handleClick} data-id="Bucs">Bucs</button>
        <button onClick={handleClick} data-id="A's">A's</button>
      </div>
      <Profiles Leaderboard={between(Leaderboard, filterScores)}></Profiles>
    </div>
    </>
  )
}

export default Board;