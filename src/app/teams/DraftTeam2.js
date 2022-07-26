import { Col, Row, Button } from 'reactstrap';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTeam2 } from '../../app/teams/TeamSlice';
import { undoTeam2 } from '../../app/teams/TeamSlice';





const DraftTeam2 = () => {
  
    const isLoading = useSelector((state) => state.staff.isLoading);
    const isDraftLoading = useSelector((state) => state.teams.loadingDraft)
    const errMsg = useSelector((state) => state.staff.errMsg);
    const team2 = useSelector(selectAllTeam2);
    const dispatch = useDispatch();
    
    const handleUndo = (event) => {
        const {id} = event.target
        // console.log(event.target)
        dispatch(undoTeam2(id));
        // setButtonStyle({})
        // console.log(teams)
      }
  
    return (
    <Col>
        <h5>Team 2 Roster</h5>
        {isDraftLoading ? <Loading /> : ""}
        {errMsg ? <Error errMsg={errMsg} />: ""}
        <ul>
            {team2.map((team) => {
                return (
                <>
                <li key={team.id} >{team.fields.name}
                <Button
                    id={team.id}
                    onClick={handleUndo}
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
  )
}

export default DraftTeam2