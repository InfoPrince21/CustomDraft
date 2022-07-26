import { useSelector } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectTeamById } from '../app/teams/TeamSlice';
import TeamDetail from '../app/teams/TeamDetail';
import SubHeader from '../components/SubHeader';
import Error from '../components/Error';
import Loading from '../components/Loading';


const TeamDetailPage = () => {
    const { teamId } = useParams();
    const team = useSelector(selectTeamById(teamId));
    // console.log('team:', team);

    const isLoading = useSelector((state) => state.teams.isLoading);
    const errMsg = useSelector((state) => state.teams.errMsg);
    let content = null;

    if (isLoading) {
        content = <Loading />;
    } else if (errMsg) {
        content = <Error errMsg={errMsg} />;
    } else {
        content = (
            <>
                <TeamDetail team={team} />
            </>
        );
    }

    return (
        <Container>
            {team && <SubHeader current={team.name} teamDetail={true} />}
            <Row>
                {content}
            </Row>
        </Container>
    );
};

export default TeamDetailPage;