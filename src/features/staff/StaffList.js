import { useSelector, useDispatch } from 'react-redux';
import {useState} from 'react';
import { Col, Row, Button } from 'reactstrap';
import StaffCard from "./StaffCard";
import { selectAllStaff} from './staffSlice';
import { undoDraftedTeams, selectAllTeam1, selectAllTeam2, selectAllTeam3, undoTeam1, undoTeam2, undoTeam3, draftTeam1, draftTeam2, draftTeam3, fetchTeam1, fetchTeam2, fetchTeam3} from '../../app/teams/TeamSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { useEffect } from 'react';
// import DraftedTeamsList from '../../app/teams/DratedTeamsList';
// import DraftedTeamsList from '../../app/teams/DratedTeamsList';

const StaffList = () => {
    // const [buttonStyle, setButtonStyle] = useEffect({})   
    const dispatch = useDispatch();
    const teams = useSelector(selectAllTeam1);
    const teams2 = useSelector(selectAllTeam2);
    const teams3 = useSelector(selectAllTeam3);
    
    const handleUndo1 = (event) => {
      const {id} = event.target
      dispatch(undoTeam1(id));
      dispatch(undoDraftedTeams(id));
      // setButtonStyle({})
      console.log(teams)
    }

    const handleUndo2 = (event) => {
        const {id} = event.target
        dispatch(undoTeam2(id));
        dispatch(undoDraftedTeams(id));
        // setButtonStyle({})
        console.log(teams)
    }

    const handleUndo3 = (event) => {
        const {id} = event.target
        dispatch(undoTeam3(id));
        dispatch(undoDraftedTeams(id));
        // setButtonStyle({})
        console.log(teams)
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
        {isDraftLoading ? <Loading /> : ""}
        {errMsg ? <Error errMsg={errMsg} />: ""}
        <Row className='ms-auto'>
            {staff.map((staff) => {
                return (
                    <>
                    <Col md='5' className='m-4' key={staff.id}>
                        <StaffCard isDraftLoading={isDraftLoading} staff={staff} />
                    </Col>
                    
                  </>
                );
            })}
            <Row className='ms-auto'>
                    <Col>
                    <h5>Team 1 Drafted Players</h5>
                    {isDraftLoading ? <Loading /> : ""}
                    {errMsg ? <Error errMsg={errMsg} />: ""}
                    <ul>
                      {teams.map((team) => {
                          return (
                            <>
                            <li>{team.name}
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
                    <h5>Team 2 Drafted Players</h5>
                    {isDraftLoading ? <Loading /> : ""}
                    {errMsg ? <Error errMsg={errMsg} />: ""}
                    <ul>
                      {teams2.map((team) => {
                          return (
                            <>
                            <li>{team.name}
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
                    <h5>Team 3 Drafted Players</h5>
                    {isDraftLoading ? <Loading /> : ""}
                    {errMsg ? <Error errMsg={errMsg} />: ""}
                    <ul>
                      {teams3.map((team) => {
                          return (
                            <>
                            <li>{team.name}
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
                  </Row>
        </Row>
        {/* <DraftedTeamsList /> */}
        </>
    );
};

export default StaffList;