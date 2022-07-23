import { Container } from 'reactstrap';
import TeamList from '../app/teams/TeamList';
import SubHeader from '../components/SubHeader';

const TeamDirectoryPage = () => {
    return (
        <Container>
            <SubHeader current='Teams' />
            <TeamList />
        </Container>
    );
};

export default TeamDirectoryPage;