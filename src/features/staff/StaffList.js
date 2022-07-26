import { useSelector, useDispatch } from 'react-redux';
import DraftTeam1 from "../../app/teams/DraftTeam1";
import DraftTeam2 from "../../app/teams/DraftTeam2";
import DraftTeam3 from "../../app/teams/DraftTeam3";
import DraftRecap from "../../app/teams/DraftRecap";
import { useTimer } from 'react-timer-hook';
import {useState} from 'react';
import { Col, Row, } from 'reactstrap';
import StaffCard from "./StaffCard";
import { selectAllStaff} from './staffSlice';
import { undoDraftedTeams, selectAllTeam1, undoTeam1, undoTeam2, undoTeam3 } from '../../app/teams/TeamSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

const StaffList = () => {

  function MyTimer({ expiryTimestamp }) {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('Your Time Expired')});
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '100px'}}>
          <span></span>:<span>{seconds}</span>
        </div>
        <p>{isRunning ? 'Running' : 'Stopped'}</p>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        {/* <button onClick={resume}>Resume</button>
        <button onClick={() => {
          // Restarts to 30 sec timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 30);
          restart(time)
        }}>Restart</button> */}
      </div>
    );
  }
  function Timer() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30); 
    return (
      <div>
        {isDraftLoading ? <Loading /> : <MyTimer expiryTimestamp={time} />}
        {errMsg ? <Error errMsg={errMsg} />: ""}
      </div>
    );
  }

  const [teamName, setTeamName] = useState("Team 1");
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  // const [buttonStyle, setButtonStyle] = useEffect({})   
    const staffAll = useSelector(selectAllStaff);
    const isLoading = useSelector((state) => state.staff.isLoading);
    const isDraftLoading = useSelector((state) => state.teams.loadingDraft)
    const errMsg = useSelector((state) => state.staff.errMsg);

    if (isLoading) {
        return (
            <Row>
                <Loading />
            </Row>
        );
    }
    if (errMsg) {
        return (
            <Row>
                <Error errMsg={errMsg} />
            </Row>
        );
    }
    return (
        <>
        <Row>
          <Col sm="3">
            <h3>{teamName} <br/> is on the clock!</h3>
            <Timer />
                  {staffAll.map((staff, index) => {
                        return (
                            <>
                                <StaffCard 
                                  setTeamName={setTeamName} 
                                  isDraftLoading={isDraftLoading} 
                                  staff={staff}
                                  teamName={teamName}
                                  key={staff.id}
                                  
                                />
                          </>
                        );
                    })}
          </Col>
            <DraftTeam1 />
            <DraftTeam2 />
            <DraftTeam3 />
          <Row>
            <DraftRecap />
          </Row>
        </Row>
        </>
    );
};

export default StaffList;