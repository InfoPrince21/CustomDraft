import { Container } from 'reactstrap';
import TeamList from '../app/teams/TeamList';
import SubHeader from '../components/SubHeader';

const StaffDirectoryPage = () => {
    return (
        <Container>
            <SubHeader current='Team-Directory' />
            <TeamList />
        </Container>
    );
};

export default StaffDirectoryPage;