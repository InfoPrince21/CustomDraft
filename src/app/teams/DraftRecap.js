import { Col, Row, Button } from 'reactstrap';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllDrafted } from '../../app/teams/TeamSlice';
import { undoDraftedTeams, undoSetDraftRecap } from '../../app/teams/TeamSlice';





const DraftRecap = () => {
  
    const isLoading = useSelector((state) => state.staff.isLoading);
    const isDraftLoading = useSelector((state) => state.teams.loadingDraft)
    const errMsg = useSelector((state) => state.staff.errMsg);
    const draftRecap = useSelector(selectAllDrafted);
    const dispatch = useDispatch();


    const handleUndo = (event) => {
        // const {id, id2} = event.target
        const id = event.target.id
        const id2 = event.target.name
        // console.log(event.target)
        dispatch(undoDraftedTeams(id));
        dispatch(undoSetDraftRecap(id2));
        // setButtonStyle({})
        // console.log(id2)
      }
  
    return (
    <Col>
        <h5>Drafted Players Recap</h5>
        {isDraftLoading ? <Loading /> : ""}
        {errMsg ? <Error errMsg={errMsg} />: ""}
        <ul>
            {draftRecap.map((team) => {
                return (
                <>
                <li key={team.id} >{team.fields.name}
                <Button
                    id={team.id}
                    name={team.fields.id}
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

export default DraftRecap