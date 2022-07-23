import { useSelector } from 'react-redux';
import { Col, Row, } from 'reactstrap';
import TeamCard from "./TeamCard";
import { selectAllTeams } from './TeamSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import AddTeamForm from '../../components/AddTeamForm';

const TeamList = () => {
    const teams = useSelector(selectAllTeams);
    

    const isLoading = useSelector((state) => state.teams.isLoading);
    const errMsg = useSelector((state) => state.teams.errMsg);

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
        <Row className='ms-auto'>
            
            {teams.map((team) => {
                return (
                    <Col md='3' className='m-3' key={team.id}>
                        <TeamCard team={team} />
                    </Col>
                );
            })}
            <AddTeamForm />
            
        </Row>
    );
};

export default TeamList;