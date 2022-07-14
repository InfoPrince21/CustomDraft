import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, Col, Row, } from 'reactstrap';
import TeamCard from "./TeamCard";
import { selectAllTeam1, removeDraftTeam1ById, undoTeam1} from './TeamSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { nanoid } from 'nanoid'

const DraftedTeamsList = () => {
  
  const dispatch = useDispatch();
    const teams = useSelector(selectAllTeam1);
    const handleUndo = (event) => {
      const {id} = event.target
      dispatch(undoTeam1(id));
      // setButtonStyle({})
      console.log(teams)
    }
  
  
    // const teams = 'yes';

    // const isLoading = useSelector((state) => state.teams.isLoading);
    // const errMsg = useSelector((state) => state.teams.errMsg);

    // if (isLoading) {
    //     return (
    //         <Row>
    //             <Loading />
    //         </Row>
    //     );
    // }

    // if (errMsg) {
    //     return (
    //         <Row>
    //             <Error errMsg={errMsg} />
    //         </Row>
    //     );
    // }

    return (
      <>
        <Row className='ms-auto'>
          <Col>
          <h1>Team 1 Drafted Players</h1>
          <ul>
            {teams.map((team) => {
                return (
                  <>
                  <li>{team.name}
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
        </Row>       
        </>
    );
};

export default DraftedTeamsList;