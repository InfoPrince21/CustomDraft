import { Container } from 'reactstrap';
import StaffList from '../features/staff/StaffList';
import SubHeader from '../components/SubHeader';
// import DraftedTeamsList from '../app/teams/DratedTeamsList';

const DraftPage = () => {
    return (
        <Container>
            <SubHeader current='Draft' />
            <StaffList />
            {/* <DraftedTeamsList /> */}
        </Container>
    );
};

export default DraftPage;