import { useSelector } from 'react-redux';
import { Col, Row, } from 'reactstrap';
import TeamCard from "./TeamCard";
import { selectAllTeams } from './TeamSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

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
                    <Col md='5' className='m-4' key={team.id}>
                        <TeamCard team={team} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default TeamList;