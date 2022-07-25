import { useSelector, useDispatch } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import {useState} from 'react';
import { Col, Row, Button } from 'reactstrap';
import StaffCard from "./StaffCard";
import { selectAllStaff} from './staffSlice';
import { undoDraftedTeams, selectAllDrafted, selectAllTeam1, selectAllTeam2, selectAllTeam3, undoTeam1, undoTeam2, undoTeam3, draftTeam1, draftTeam2, draftTeam3, fetchTeam1, fetchTeam2, fetchTeam3} from '../../app/teams/TeamSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
// import DraftedTeamsList from '../../app/teams/DratedTeamsList';
// import DraftedTeamsList from '../../app/teams/DratedTeamsList';

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
    const dispatch = useDispatch();
    const teams = useSelector(selectAllTeam1);
    const teams2 = useSelector(selectAllTeam2);
    const teams3 = useSelector(selectAllTeam3);
    const draftRecap = useSelector(selectAllDrafted);
    
    const handleUndo1 = (event) => {
      const {id} = event.target
      console.log(event.target)
      dispatch(undoTeam1(id));
      // setButtonStyle({})
      // console.log(teams)
    }

    const handleUndo2 = (event) => {
        const {id} = event.target
        dispatch(undoTeam2(id));
        // setButtonStyle({})
        // console.log(teams)
    }

    const handleUndo3 = (event) => {
        const {id} = event.target
        dispatch(undoTeam3(id));
        // setButtonStyle({})
        // console.log(teams)
    }

    const handleUndoRecap = (event) => {
      const {id} = event.target
      dispatch(undoDraftedTeams(id));
      // setButtonStyle({})
      // console.log(teams)
  }
  
    const staff = useSelector(selectAllStaff);
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
                  {staff.map((staff) => {
                        return (
                            <>
                                <StaffCard 
                                  setTeamName={setTeamName} 
                                  isDraftLoading={isDraftLoading} 
                                  staff={staff}
                                  teamName={teamName}
                                  key={staff.fields.id}
                                />
                          </>
                        );
                    })}
            
          </Col>
            {/* {staff.map((staff) => {
                return (
                    <>
                    <Col md='5' className='m-4' key={staff.id}>
                        <StaffCard isDraftLoading={isDraftLoading} staff={staff} />
                    </Col>
                    
                  </>
                );
            })} */}
                    <Col>
                    <h5>Team 1 Roster</h5>
                    {isDraftLoading ? <Loading /> : ""}
                    {errMsg ? <Error errMsg={errMsg} />: ""}
                    <ul>
                      {teams.map((team) => {
                          return (
                            <>
                            <li key={team.fields.id}>{team.fields.name}
                            <Button
                              id={team.id}
                              onClick={handleUndo1}
                              color="info"
                              outline
                              close
                              size="sm"
                              />
                            </li>          
                            </>
                          );
                      })}
                      </ul>
                      </Col>
                      <Col>
                    <h5>Team 2 Roster</h5>
                    {isDraftLoading ? <Loading /> : ""}
                    {errMsg ? <Error errMsg={errMsg} />: ""}
                    <ul>
                      {teams2.map((team) => {
                          return (
                            <>
                            <li key={team.fields.id}>{team.fields.name}
                            <Button
                              id={team.id}
                              onClick={handleUndo2}
                              color="info"
                              outline
                              close
                              size="sm"
                              />
                            </li>    
                            </>
                          );
                      })}
                      </ul>
                      </Col>
                      <Col>
                    <h5>Team 3 Roster</h5>
                    {isDraftLoading ? <Loading /> : ""}
                    {errMsg ? <Error errMsg={errMsg} />: ""}
                    <ul>
                      {teams3.map((team) => {
                          return (
                            <>
                            <li key={team.fields.id}>{team.fields.name}
                            <Button
                              id={team.id}
                              onClick={handleUndo3}
                              color="info"
                              outline
                              close
                              size="sm"
                              />
                            </li>  
                            </>
                          );
                      })}
                      </ul>
                      </Col>
              <Row>
                
              
              {/* <Col>
                    <h1>Recap</h1>
                    {isDraftLoading ? <Loading /> : ""}
                    {errMsg ? <Error errMsg={errMsg} />: ""}
                    <ul>
                      {draftRecap.map((player) => {
                          return (
                            <>
                            <li key={player.id}>{player.fields.name}
                            <Button
                              id={player.id}
                              onClick={handleUndoRecap}
                              color="info"
                              outline
                              close
                              size="sm"
                              />
                            </li>
                            </>
                          );
                      })}
                    </ul>
              </Col>  */}
              </Row>
            </Row>
        {/* <DraftedTeamsList /> */}
        </>
    );
};

export default StaffList;