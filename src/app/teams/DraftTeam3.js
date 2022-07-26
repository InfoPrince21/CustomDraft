import { Col, Row, Button } from 'reactstrap';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTeam3 } from '../../app/teams/TeamSlice';
import { undoTeam3 } from '../../app/teams/TeamSlice';





const DraftTeam3 = () => {
  
    const isLoading = useSelector((state) => state.staff.isLoading);
    const isDraftLoading = useSelector((state) => state.teams.loadingDraft)
    const errMsg = useSelector((state) => state.staff.errMsg);
    const team3 = useSelector(selectAllTeam3);
    const dispatch = useDispatch();
    
    const handleUndo = (event) => {
        const {id} = event.target
        // console.log(event.target)
        dispatch(undoTeam3(id));
        // setButtonStyle({})
        // console.log(teams)
      }
  
    return (
    <Col>
        <h5>Team 3 Roster</h5>
        {isDraftLoading ? <Loading /> : ""}
        {errMsg ? <Error errMsg={errMsg} />: ""}
        <ul>
            {team3.map((team) => {
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

export default DraftTeam3