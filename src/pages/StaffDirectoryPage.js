import { Container } from 'reactstrap';
import StaffList from '../features/staff/StaffList';
import SubHeader from '../components/SubHeader';
// import DraftedTeamsList from '../app/teams/DratedTeamsList';

const StaffDirectoryPage = () => {
    return (
        <Container>
            <SubHeader current='Staff-Directory' />
            <StaffList />
            {/* <DraftedTeamsList /> */}
        </Container>
    );
};

export default StaffDirectoryPage;