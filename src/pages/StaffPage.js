import { Container, Card, CardHeader, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import StaffList from '../features/staff/StaffList';
import SubHeader from '../components/SubHeader';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectStaffById } from '../features/staff/staffSlice';
import {useState} from 'react';
import { Col, Row, Button } from 'reactstrap';
import StaffCard from "../features/staff/StaffCard";
import { selectAllStaff} from "../features/staff/staffSlice";
import AddStaffForm from "../components/AddStaffForm";
import StaffDirectory from "../features/staff/StaffDirectory";
import StaffDetail from '../features/staff/StaffDetail';
import Error from '../components/Error';
import Loading from '../components/Loading';


// import DraftedTeamsList from '../app/teams/DratedTeamsList';


var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const table = base('Teams');


const StaffPage = () => {
    // const { staffId } = useParams();
    // const staff = useSelector(selectStaffById(staffId));
    const getStaff = useSelector(selectAllStaff);
    const isLoading = useSelector((state) => state.staff.isLoading);
    const errMsg = useSelector((state) => state.staff.errMsg);
    // const { id, image, name, stats, featured } = getStaff;

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
        <Container>
            <SubHeader current='Staff' />
            <AddStaffForm />
            <Row md='5' className='m-4'>
                {getStaff.map((staff) => {
                    return (
                        <StaffDirectory staff={staff} />
                    );
                })}
            </Row>
            {/* <DraftedTeamsList /> */}
            {/* <StaffDetail staff={staff} /> */}
        </Container>
    );
};

export default StaffPage;