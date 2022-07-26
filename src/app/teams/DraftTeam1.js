import { Col, Row, Button } from 'reactstrap';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTeam1 } from '../../app/teams/TeamSlice';
import { undoTeam1 } from '../../app/teams/TeamSlice';





const DraftTeam1 = () => {
  
    const isLoading = useSelector((state) => state.staff.isLoading);
    const isDraftLoading = useSelector((state) => state.teams.loadingDraft)
    const errMsg = useSelector((state) => state.staff.errMsg);
    const team1 = useSelector(selectAllTeam1);
    const dispatch = useDispatch();


    const handleUndo1 = (event) => {
        const {id} = event.target
        // console.log(event.target)
        dispatch(undoTeam1(id));
        // setButtonStyle({})
        // console.log(teams)
      }
  
    return (
    <Col>
        <h5>Team 1 Roster</h5>
        {isDraftLoading ? <Loading /> : ""}
        {errMsg ? <Error errMsg={errMsg} />: ""}
        <ul>
            {team1.map((team) => {
                return (
                <>
                <li key={team.id} >{team.fields.name}
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
  )
}

export default DraftTeam1