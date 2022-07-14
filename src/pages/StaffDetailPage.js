import { useSelector } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectStaffById } from '../features/staff/staffSlice';
import StaffDetail from '../features/staff/StaffDetail';
import SubHeader from '../components/SubHeader';
import Error from '../components/Error';
import Loading from '../components/Loading';


const StaffDetailPage = () => {
    const { staffId } = useParams();
    const staff = useSelector(selectStaffById(staffId));
    console.log('staff:', staff);

    const isLoading = useSelector((state) => state.staff.isLoading);
    const errMsg = useSelector((state) => state.staff.errMsg);
    let content = null;

    if (isLoading) {
        content = <Loading />;
    } else if (errMsg) {
        content = <Error errMsg={errMsg} />;
    } else {
        content = (
            <>
                <StaffDetail staff={staff} />
            </>
        );
    }

    return (
        <Container>
            {staff && <SubHeader current={staff.name} staffDetail={true} />}
            <Row>
                {content}
            </Row>
        </Container>
    );
};

export default StaffDetailPage;